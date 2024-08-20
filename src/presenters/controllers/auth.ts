import { login, register, RegistrationDto } from '@domains';
import { BaseController, Controller, Post, ValidateBody } from '@utils';
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

  @Post('/register')
  @ValidateBody(RegistrationDto)
  async register(req: Request) {
    return register(req.body);
  }
}
