import { AcceptInvitationDto, InviteUserDto, UserRole } from '@domains';
import { AuthError } from '@errors';
import {
  acceptInvitation,
  confirmOtp,
  deleteInvitation,
  getAuthenticationData,
  getUserInvitations,
  getUsersByWorkspace,
  getUserSummary,
  getWorkspaceById,
  inviteUser,
} from '@useCases';
import {
  BaseController,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  RolesGuard,
  ValidateBody,
} from '@utils';

import { authenticate, verifySubscription } from '../middlewares';

@Controller('/user')
export class UserController extends BaseController {
  @Get('/', [authenticate(false), verifySubscription()])
  async list(req: Express.AuthenticatedRequest) {
    let verified;
    if (req.query.verified === 'true') {
      verified = true;
    }
    if (req.query.verified === 'false') {
      verified = false;
    }
    let role = [];
    if (req.query?.role?.length) {
      role = typeof req.query?.role === 'string' ? [req.query.role] : req.query.role;
    }

    return getUsersByWorkspace(
      req.workspace,
      { skip: req.pagination.skip, limit: req.pagination.limit },
      { verified, role, search: req.filter.search },
    );
  }

  @Get('/summary', [authenticate(), verifySubscription()])
  async summary(req: Express.AuthenticatedRequest) {
    return getUserSummary(req.workspace);
  }

  @Get('/invitation', [authenticate(), verifySubscription()])
  async invitations(req: Express.AuthenticatedRequest) {
    return getUserInvitations(req.workspace, req.pagination);
  }

  @Delete('/invitation/:invitationId', [authenticate(false)])
  async deleteInvitation(req: Express.AuthenticatedRequest) {
    return deleteInvitation(req.params.invitationId);
  }

  @Get('/me', [authenticate(false)])
  async me(req: Express.AuthenticatedRequest) {
    const workspace = await getWorkspaceById(req.workspace);
    return { user: req.user, workspace };
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
  @Post('/invite', [authenticate(), verifySubscription()])
  async inviteUser(
    req: Express.AuthenticatedRequest<unknown, unknown, { email: string; role: UserRole }>,
  ) {
    return inviteUser(req.body.email, req.workspace, req.body.role);
  }

  @ValidateBody(AcceptInvitationDto)
  @Post('/accept-invitation')
  async acceptInvitation(req: Express.AuthenticatedRequest<unknown, unknown, AcceptInvitationDto>) {
    const invitation = await acceptInvitation(req.body);
    const authData = await getAuthenticationData(invitation.user);
    return { ...invitation, ...authData };
  }
}
