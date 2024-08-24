import { AuthError } from '@errors';
import { confirmOtp, getSubscriptionByWorkspace, getWorkspaceById } from '@useCases';
import { BaseController, Controller, Get, Patch } from '@utils';

import { authenticateToken } from '../middlewares';

@Controller('/user')
export class UserController extends BaseController {
  constructor() {
    super();
  }

  @Get('/me', [authenticateToken])
  async me(req: Express.AuthenticatedRequest<{ workspace: string }>) {
    const workspace = req.headers.workspace as string;
    const workspaceData = await getWorkspaceById(workspace);
    const subscriptionData = await getSubscriptionByWorkspace(workspace);
    return { user: req.user, workspace: workspaceData, subscriptionData };
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
