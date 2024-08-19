import { login } from '@domains';
import { BaseController, Controller, Post } from '@utils';
import { Request } from 'express';

@Controller('/auth')
export class AuthenticationController extends BaseController {
  constructor() {
    super();
  }

  @Post('/login')
  async login(req: Request) {
    return login(req.body.login, req.body.password);
  }
}
