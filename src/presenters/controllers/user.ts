import { confirmOtp, createUser, getSubscriptionByWorkspace, getWorkspaceById, UserDto } from '@domains';
import { AuthError } from '@errors';
import { BaseController, Controller, Get, Patch, Post, ValidateBody } from '@utils';
import { Request } from 'express';

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
      console.log(subscriptionData);
      return { user: req.user, workspace: workspaceData, subscriptionData };
    }
  }

  @Get('/:id', [authenticateToken])
  async get(req: Express.AuthenticatedRequest) {
    return req.user;
  }

  @Post('/')
  @ValidateBody(UserDto)
  async create(req: Request<unknown, unknown, UserDto>) {
    return createUser(req.body);
  }

  @Patch('/confirm-otp', [authenticateToken])
  async confirmOtp(req: Express.AuthenticatedRequest<unknown, unknown, { otp: string }>) {
    if (req.user.otp !== +req.body.otp) {
      throw new AuthError('Unverified', { message: 'Invalid otp code' }, 403);
    }
    return confirmOtp(req.user._id);
  }
}
