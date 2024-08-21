import { createUser, getWorkspaceById, UserDto } from '@domains';
import { BaseController, Controller, Get, Post, ValidateBody } from '@utils';
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
      return { user: req.user, workspace: workspaceData };
    }
  }

  @Get('/:id', [authenticateToken])
  async get(req: Express.AuthenticatedRequest) {
    return req.user;
  }

  @Post('/')
  @ValidateBody(UserDto)
  async create(req: Request<unknown, UserDto>) {
    return createUser(req.body);
  }
}
