import { createUser, getWorkspaceById, UserDto } from '@domains';
import { BaseController, Controller, Get, Post, ValidateBody } from '@utils';
import { Request } from 'express';

import { authenticateToken } from '../middlewares';

@Controller('/user')
export class UserController extends BaseController {
  constructor() {
    super();
  }

  @Get('/me', [authenticateToken])
  async me(req: Express.Request<true>) {
    const workspace = await getWorkspaceById(req.user?.workspace);
    return { user: req.user, workspace };
  }

  @Get('/:id', [authenticateToken])
  async get(req: Request) {
    return req.user;
  }

  @Post('/')
  @ValidateBody(UserDto)
  async create(req: Request<unknown, UserDto>) {
    return createUser(req.body);
  }
}
