import { RegistrationDto } from '@domains';
import { authenticateWithGoogle, getGoogleAuthUrl, login, register } from '@useCases';
import { BaseController, Controller, Get, Post, ValidateBody } from '@utils';
import { Request, Response } from 'express';
import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() });
@Controller('/auth')
export class AuthenticationController extends BaseController {
  constructor() {
    super();
  }

  @Post('/login')
  async login(req: Request) {
    return login(req.body.login, req.body.password);
  }

  @Post('/register', [upload.single('workspaceImage')])
  @ValidateBody(RegistrationDto)
  async register(req: Request<unknown, unknown, RegistrationDto>) {
    return register(req.body, req.file);
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
