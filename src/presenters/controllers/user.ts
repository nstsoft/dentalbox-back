import { AcceptInvitationDto, InviteUserDto, UserRole } from '@domains';
import { AuthError } from '@errors';
import {
  acceptInvitation,
  confirmOtp,
  getAuthenticationData,
  getSubscriptionByWorkspace,
  getWorkspaceById,
  inviteUser,
} from '@useCases';
import { BaseController, Controller, Get, Patch, Post, RolesGuard, ValidateBody } from '@utils';

import { authenticate, authenticateUnverified } from '../middlewares';

@Controller('/user')
export class UserController extends BaseController {
  constructor() {
    super();
  }

  @Get('/me', [authenticateUnverified])
  async me(req: Express.AuthenticatedRequest<{ workspace: string }>) {
    const workspace = req.headers.workspace as string;
    const workspaceData = await getWorkspaceById(workspace);
    const subscriptionData = await getSubscriptionByWorkspace(workspace);
    return { user: req.user, workspace: workspaceData, subscriptionData };
  }

  @Get('/:id', [authenticate])
  async get(req: Express.AuthenticatedRequest) {
    return req.user;
  }

  @Patch('/verify-otp', [authenticateUnverified])
  async confirmOtp(req: Express.AuthenticatedRequest<unknown, unknown, { otp: string }>) {
    if (req.user.otp !== +req.body.otp) {
      throw new AuthError('Unverified', { message: 'Invalid otp code' }, 403);
    }
    return confirmOtp(req.user._id);
  }

  @RolesGuard('admin')
  @ValidateBody(InviteUserDto)
  @Post('/invite', [authenticate])
  async inviteUser(req: Express.AuthenticatedRequest<unknown, unknown, { email: string; role: UserRole }>) {
    return inviteUser(req.body.email, req.workspace, req.body.role);
  }

  @ValidateBody(AcceptInvitationDto)
  @Patch('/accept-invitation')
  async acceptInvitation(req: Express.AuthenticatedRequest<unknown, unknown, AcceptInvitationDto>) {
    const invitation = await acceptInvitation(req.body);
    const authData = await getAuthenticationData(invitation.user);
    return { ...invitation, ...authData };
  }
}
