import { AuthError } from '@errors';
import { confirmOtp, getSubscriptionByWorkspace, getWorkspaceById } from '@useCases';
import { BaseController, Controller, Get, Patch } from '@utils';

import { authenticateToken } from '../middlewares';

@Controller('/user')
export class UserController extends BaseController {
  constructor() {
    super();
  }

  @Get('/me/:workspace', [authenticateToken])
  async me(req: Express.AuthenticatedRequest<{ workspace: string }>) {
    const { workspace } = req.params;
    if (req.user.workspaces.includes(workspace)) {
      const workspaceData = await getWorkspaceById(workspace);
      const subscriptionData = await getSubscriptionByWorkspace(workspace);
      return { user: req.user, workspace: workspaceData, subscriptionData };
    } else {
      throw new AuthError('Forbidden', { message: 'You do not have access to this workspace' }, 403);
    }
  }

  @Get('/:id', [authenticateToken])
  async get(req: Express.AuthenticatedRequest) {
    return req.user;
  }

  @Patch('/confirm-otp', [authenticateToken])
  async confirmOtp(req: Express.AuthenticatedRequest<unknown, unknown, { otp: string }>) {
    if (req.user.otp !== +req.body.otp) {
      throw new AuthError('Unverified', { message: 'Invalid otp code' }, 403);
    }
    return confirmOtp(req.user._id);
  }
}
