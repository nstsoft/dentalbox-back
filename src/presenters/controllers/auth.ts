import { LoginDto, RegistrationDto } from '@domains';
import { AuthError } from '@errors';
import {
  authenticateWithGoogle,
  getAuthenticationData,
  getGoogleAuthUrl,
  login,
  register,
} from '@useCases';
import { BaseController, Controller, Get, Post, refreshAuthToken, ValidateBody } from '@utils';
import { plainToClass } from 'class-transformer';
import { validate, type ValidationError } from 'class-validator';
import { Request, Response } from 'express';
import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() });

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

  @Post('/register', [upload.single('file')])
  async register(req: Request<unknown, unknown>, res: Response) {
    const data = JSON.parse(req.body.data);

    const errors: ValidationError[] = await validate(
      plainToClass(RegistrationDto, data) as object,
      {
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
      },
    );

    if (errors.length > 0) {
      const formattedErrors = errors.map((error) => {
        return {
          property: error.property,
          constraints: Object.values(error.constraints || {}),
          children: error.children,
        };
      });

      return res.status(400).json({ errors: formattedErrors });
    }

    const response = await register(data, req.file?.buffer);
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
