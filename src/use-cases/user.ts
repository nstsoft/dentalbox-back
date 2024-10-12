import { invitationSource, subscriptionSource, userSource, workspaceSource } from '@data';
import { AcceptInvitationDto, InvitationStatus, UserDto, UserRole, UserStatus } from '@domains';
import {
  InvitationAlreadySent,
  InvitationError,
  InvitationExpired,
  InvitationNotExists,
  WorkspaceError,
  WorkspaceFullError,
} from '@errors';
import { sendInvitationLink, sentOtp } from '@services';
import { generateOTP, generateToken, Pagination, verifyToken } from '@utils';
import { config } from 'config';
import { BadRequest } from 'http-errors';
import moment from 'moment';
import querystring from 'querystring';
import { MoreThan } from 'typeorm';

export const createUser = (data: UserDto) => {
  return userSource.create({
    status: data.status ?? UserStatus.pending,
    ...data,
    roles: [],
    workspaces: [],
    isVerified: false,
    enableNotifications: true,
    otp: generateOTP(),
  });
};

export const getUsersByWorkspace = async (
  workspace: string,
  pagination: { limit: number; skip: number },
  filter?: { role: UserRole[]; verified?: boolean; search?: string },
) => {
  const { count, data } = await userSource.findAll(
    { workspaces: { $in: [workspace] } },
    pagination,
    { ...filter, workspace },
    { surname: 'ASC' },
  );

  return { count, data: data.map((user) => user.excludeWorkspaces(workspace)) };
};

export const getUserInvitations = (workspace: string, pagination: Pagination) => {
  return invitationSource.findByWorkspace(workspace, pagination);
};

export const deleteInvitation = (id: string) => {
  return invitationSource.delete(id);
};

export const confirmOtp = (_id: string) => userSource.updateOne(_id, { isVerified: true });

export const inviteUser = async (email: string, workspace: string, role: UserRole) => {
  const [existedInvitation, existedUser, currentWorkspace] = await Promise.all([
    invitationSource.findOne({ email, workspace }),
    userSource.findOne({ email }),
    workspaceSource.findOneById(workspace),
  ]);

  if (!currentWorkspace?.canAcceptUser()) {
    throw new WorkspaceError(WorkspaceFullError, { message: 'Workspace is full' });
  }
  if (existedInvitation && existedInvitation.activeTill > moment().unix()) {
    throw new InvitationError(InvitationAlreadySent, 'Invitation already sent');
  }

  const invitation = await invitationSource.create({
    email,
    workspace,
    userRole: role,
    activeTill: moment().add(1, 'w').startOf('day').unix(),
    status: InvitationStatus.pending,
  });

  const invitationToken = generateToken({ _id: invitation._id }, '1w');

  const invitationLink =
    config.INVITATION_LINK +
    '?' +
    querystring.stringify({
      existed: !!existedUser,
      email,
      invitationToken,
      workspace: currentWorkspace.name,
      workspaceImage: currentWorkspace.image ?? '',
    });

  return sendInvitationLink(invitationLink, email);
};

export const acceptInvitation = async (data: AcceptInvitationDto) => {
  const { _id } = verifyToken(data.token) as { _id: string };
  const invitation = await invitationSource.findOne({
    _id,
    status: InvitationStatus.pending,
    activeTill: MoreThan(moment().startOf('day').unix()),
  });

  if (!invitation) {
    throw new InvitationError(InvitationNotExists, 'Invitation not found', 404);
  }

  if (invitation.activeTill < moment().unix()) {
    throw new InvitationError(InvitationExpired, 'Invitation expired');
  }

  const workspace = await workspaceSource.findOneById(invitation.workspace);

  if (!workspace?.canAcceptUser()) {
    throw new WorkspaceError(WorkspaceFullError, { message: 'Workspace is full' });
  }

  let user = await userSource.findOne({ email: invitation.email });
  const updatedWorkspaces = [...new Set([...(user?.workspaces ?? []), invitation.workspace])];
  const updatedRoles = [
    ...new Set([
      ...(user?.roles ?? []),
      { workspace: invitation.workspace, role: invitation.userRole },
    ]),
  ];

  if (user) {
    await userSource.updateOne(user._id, { workspaces: updatedWorkspaces, roles: updatedRoles });
  } else {
    if (!data.password) {
      throw BadRequest('Password is required');
    }

    const otp = generateOTP();

    user = await userSource.create({
      otp,
      password: data.password,
      dob: new Date(data.dob).toString(),
      email: invitation.email,
      secondName: data.secondName ?? '',
      surname: data.surname ?? '',
      address: data.address,
      status: UserStatus.active,
      isVerified: false,
      name: data.name ?? '',
      workspaces: updatedWorkspaces,
      roles: updatedRoles,
      enableNotifications: false,
      sex: data.sex,
    });

    await sentOtp(user, otp);
  }

  return { user, subscription: await subscriptionSource.findOneByWorkspace(user.workspaces[0]) };
};

export const getUserSummary = async (workspace: string) => {
  return userSource.getSummary(workspace);
};
