import { createUser, UserDto } from '@domains';
import { BaseController, Controller, Get, Post, ValidateBody } from '@utils';
import { Request } from 'express';

@Controller('/user')
export class UserController extends BaseController {
  constructor() {
    super();
  }

  @Get('/')
  async get() {
    console.log('Hello World!');
    return 'body';
  }

  @Post('/')
  @ValidateBody(UserDto)
  async create(req: Request<unknown, UserDto>) {
    console.log('body', req.body);
    return createUser(req.body);
  }
}
