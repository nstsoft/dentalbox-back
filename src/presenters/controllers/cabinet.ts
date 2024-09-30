import { CreateCabinetDto } from '@domains';
import { createCabinet, createChair, getCabinetsByWorkspaceId } from '@useCases';
import { BaseController, Controller, Get, Post, RolesGuard } from '@utils';
import { plainToClass } from 'class-transformer';
import { validate, type ValidationError } from 'class-validator';
import { Response } from 'express';
import multer from 'multer';

import { authenticate } from '../middlewares';
const upload = multer({ storage: multer.memoryStorage() });
@Controller('/cabinet')
export class CabinetController extends BaseController {
  @Get('/', [authenticate(true, true)])
  async list(req: Express.AuthenticatedRequest) {
    return getCabinetsByWorkspaceId(
      req.workspace,
      {
        skip: req.pagination.skip,
        limit: req.pagination.limit,
      },
      req.query.search,
    );
  }

  @RolesGuard('admin', 'owner')
  @Post('/', [authenticate(true, true), upload.single('file')])
  async create(req: Express.AuthenticatedRequest, res: Response) {
    const data = JSON.parse(req.body.data) as CreateCabinetDto;

    const errors: ValidationError[] = await validate(
      plainToClass(CreateCabinetDto, data) as object,
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

    const cabinet = await createCabinet({ ...data, workspace: req.workspace }, req.file?.buffer);
    await Promise.all(
      data.chairs.map(async (name) =>
        createChair({ name, cabinet: cabinet._id, workspace: req.workspace }),
      ),
    );
    return cabinet;
  }
}
