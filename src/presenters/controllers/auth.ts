import { LoginDto, RegistrationDto } from '@domains';
import { authenticateWithGoogle, getAuthenticationData, getGoogleAuthUrl, login, register } from '@useCases';
import { BaseController, Controller, Get, Post, ValidateBody } from '@utils';
import { Request, Response } from 'express';

@Controller('/auth')
export class AuthenticationController extends BaseController {
  constructor() {
    super();
  }

  @Post('/login')
  @ValidateBody(LoginDto)
  async login(req: Request) {
    const user = await login(req.body.login, req.body.password);
    return getAuthenticationData(user);
  }

  @Post('/register')
  @ValidateBody(RegistrationDto)
  async register(req: Request<unknown, unknown, RegistrationDto>) {
    let buffer;
    if (req.body.workspaceImage?.length) {
      buffer = Buffer.from(req.body.workspaceImage ?? '', 'base64');
    }

    const response = await register(req.body, buffer);
    const authData = await getAuthenticationData(response.user);
    return { ...response, ...authData };
  }

  @Get('/google')
  async google() {
    return getGoogleAuthUrl();
  }

  @Get('/google/callback')
  async googleCallback(req: Request, res: Response) {
    const code = req.query.code as string;
    const url = await authenticateWithGoogle(code);
    res.redirect(url);
  }
}
