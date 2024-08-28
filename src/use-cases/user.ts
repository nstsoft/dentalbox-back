import { AcceptInvitationDto, InvitationStatus, UserDto, UserRole, UserStatus } from '@domains';
import { InvitationAlreadySent, InvitationError, InvitationExpired, InvitationNotExists } from '@errors';
import { sendInvitationLink, sentOtp } from '@services';
import { invitationSource, subscriptionSource, userSource } from '@src/data-layer';
import { generateOTP } from '@utils';
import { config } from 'config';
import { BadRequest } from 'http-errors';
import moment from 'moment';

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

export const confirmOtp = (_id: string) => {
  return userSource.updateOne(_id, { isVerified: true });
};

export const inviteUser = async (email: string, workspace: string, role: UserRole) => {
  const [existedInvitation, existedUser] = await Promise.all([
    invitationSource.findOne({ email, workspace }),
    userSource.findOne({ email }),
  ]);

  if (existedInvitation && existedInvitation.activeTill > moment().unix()) {
    throw new InvitationError(InvitationAlreadySent, 'Invitation already sent');
  }

  const invitation = await invitationSource.create({
    email,
    workspace,
    userRole: role,
    activeTill: moment().add(1, 'w').unix(),
    status: InvitationStatus.pending,
  });

  const invitationLink = config.INVITATION_LINK + `?invitation=${invitation}&existed=${!!existedUser}&email=${email}`;

  return sendInvitationLink(invitationLink, email);
};

export const acceptInvitation = async (data: AcceptInvitationDto) => {
  const invitation = await invitationSource.findOne({ _id: data.invitation, status: InvitationStatus.pending });

  if (!invitation) {
    throw new InvitationError(InvitationNotExists, 'Invitation not found', 404);
  }

  if (invitation.activeTill < moment().unix()) {
    throw new InvitationError(InvitationExpired, 'Invitation expired');
  }

  let user = await userSource.findOne({ email: invitation.email });
  const updatedWorkspaces = [...new Set([...(user?.workspaces ?? []), invitation.workspace])];
  const updatedRoles = [
    ...new Set([...(user?.roles ?? []), { workspace: invitation.workspace, role: invitation.userRole }]),
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
    });

    await sentOtp(user, otp);
  }

  return { user, subscription: await subscriptionSource.findOneByWorkspace(user.workspaces[0]) };
};
