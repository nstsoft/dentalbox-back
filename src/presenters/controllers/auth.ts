import { authenticateWithGoogle, getGoogleAuthUrl, login, register, RegistrationDto } from '@domains';
import { BaseController, Controller, Get, Post, ValidateBody } from '@utils';
import { Request, Response } from 'express';

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

  @Get('/google')
  async google() {
    return getGoogleAuthUrl();
  }

  @Get('/google/callback')
  async googleCallback(req: Request, res: Response) {
    const code = req.query.code as string;
    console.log('dddd', req.query);
    const url = await authenticateWithGoogle(code);
    res.redirect(url);
  }
}
