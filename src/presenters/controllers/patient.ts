import { PatientDto } from '@domains';
import { createPatient } from '@useCases';
import { BaseController, Controller, Get, Post, RolesGuard } from '@utils';
import { plainToClass } from 'class-transformer';
import { validate, type ValidationError } from 'class-validator';
import { Response } from 'express';
import multer from 'multer';

import { authenticate } from '../middlewares';

const upload = multer({ storage: multer.memoryStorage() });

@Controller('/patient')
export class PatientController extends BaseController {
  @Get('/', [authenticate(false)])
  async list(req: Express.AuthenticatedRequest) {
    return [];
  }

  @RolesGuard('admin', 'owner')
  @Post('/', [authenticate(), upload.single('file')])
  async inviteUser(req: Express.AuthenticatedRequest, res: Response) {
    const data = JSON.parse(req.body.data) as PatientDto;

    const errors: ValidationError[] = await validate(plainToClass(PatientDto, data) as object, {
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    });
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
    return createPatient({ ...data, workspace: req.workspace }, req.file?.buffer);
  }
}
