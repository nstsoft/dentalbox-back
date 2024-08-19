import { createUser, login, UserDto } from '@domains';
import { BaseController, Controller, Get, Post, ValidateBody } from '@utils';
import { Request } from 'express';

import { authenticateToken } from '../middlewares';

@Controller('/user', [authenticateToken])
export class UserController extends BaseController {
  constructor() {
    super();
  }

  @Get('/:id')
  async get(req: Request) {
    return req.user;
  }

  @Post('/login')
  async login(req: Request) {
    return login(req.body.login, req.body.password);
  }

  @Post('/')
  @ValidateBody(UserDto)
  async create(req: Request<unknown, UserDto>) {
    return createUser(req.body);
  }
}
