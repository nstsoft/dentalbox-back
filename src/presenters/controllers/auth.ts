import { LoginDto, RegistrationDto } from '@domains';
import { AuthError } from '@src/errors';
import { authenticateWithGoogle, getAuthenticationData, getGoogleAuthUrl, login, register } from '@useCases';
import { BaseController, Controller, Get, Post, refreshAuthToken, ValidateBody } from '@utils';
import { Request, Response } from 'express';

@Controller('/auth')
export class AuthenticationController extends BaseController {
  @Post('/login')
  @ValidateBody(LoginDto)
  async login(req: Request) {
    const user = await login(req.body.login, req.body.password);
    return getAuthenticationData(user);
  }

  @Get('/refresh-token')
  async refreshToken(req: Request) {
    const authHeader = req.headers.authorization;
    const authToken = authHeader && authHeader.split(' ')[1];
    const refreshToken = req.headers['refresh-token'] as string;
    if (!authToken || !refreshToken) {
      throw new AuthError('TokenNotProvided', { message: 'Token not provided' }, 403);
    }
    return refreshAuthToken(authToken, refreshToken);
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
