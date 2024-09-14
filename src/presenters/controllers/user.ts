import { AcceptInvitationDto, InviteUserDto, UserRole } from '@domains';
import { AuthError } from '@errors';
import { acceptInvitation, confirmOtp, getAuthenticationData, getUsersByWorkspace, inviteUser } from '@useCases';
import { BaseController, Controller, Get, Patch, Post, RolesGuard, ValidateBody } from '@utils';

import { authenticate } from '../middlewares';

@Controller('/user')
export class UserController extends BaseController {
  @Get('/', [authenticate(false)])
  async list(req: Express.AuthenticatedRequest<{ workspace: string }>) {
    return getUsersByWorkspace(req.workspace, { skip: req.query.skip, limit: req.query.limit });
  }

  @Get('/me', [authenticate(false)])
  async me(req: Express.AuthenticatedRequest<{ workspace: string }>) {
    return { user: req.user };
  }

  @Get('/:id', [authenticate()])
  async get(req: Express.AuthenticatedRequest) {
    return req.user;
  }

  @Patch('/verify-otp', [authenticate(false)])
  async confirmOtp(req: Express.AuthenticatedRequest<unknown, unknown, { otp: string }>) {
    if (req.user.otpCode !== +req.body.otp) {
      throw new AuthError('Unverified', { message: 'Invalid otp code' }, 403);
    }
    return confirmOtp(req.user._id);
  }

  @RolesGuard('admin', 'owner')
  @ValidateBody(InviteUserDto)
  @Post('/invite', [authenticate()])
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
