import { PatientDto } from '@domains';
import {
  createCard,
  createDentalMap,
  createPatient,
  findPatientOrFail,
  getPatientsByWorkspace,
} from '@useCases';
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
    return getPatientsByWorkspace(req.workspace, req.pagination, { search: req.query.search });
  }

  @Get('/:patient', [authenticate(false)])
  async getById(req: Express.AuthenticatedRequest) {
    return findPatientOrFail(req.params.patient, req.workspace);
  }

  @RolesGuard('admin', 'owner')
  @Post('/', [authenticate(), upload.single('file')])
  async createPatient(req: Express.AuthenticatedRequest, res: Response) {
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
    const patient = await createPatient({ ...data, workspace: req.workspace }, req.file?.buffer);
    const [card, dentalMap] = await Promise.all([
      createCard(patient._id),
      createDentalMap({ patient: patient._id }),
    ]);

    return { patient, card, dentalMap };
  }
}
