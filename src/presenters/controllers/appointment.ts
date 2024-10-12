import { AppointmentListQueryDto, CreateAppointmentDto } from '@src/domains';
import { createAppointment, getAppointmentList, validateAppointment } from '@useCases';
import { BaseController, Controller, Get, Post, ValidateBody, ValidateQuery } from '@utils';

import { authenticate } from '../middlewares';

@Controller('/appointment')
export class AppointmentController extends BaseController {
  @Get('/', [authenticate()])
  @ValidateQuery(AppointmentListQueryDto)
  async list(
    req: Express.AuthenticatedRequest<unknown, unknown, unknown, AppointmentListQueryDto>,
  ) {
    const criteria = { workspace: req.workspace, start: req.query.start, end: req.query.end };

    const filter = {
      patient: typeof req.query?.patient === 'string' ? [req.query.patient] : req.query.patient,
      doctor: typeof req.query?.doctor === 'string' ? [req.query.doctor] : req.query.doctor,
      cabinet: typeof req.query?.cabinet === 'string' ? [req.query.cabinet] : req.query.cabinet,
    };

    return getAppointmentList(criteria, filter);
  }

  @Post('/', [authenticate()])
  @ValidateBody(CreateAppointmentDto)
  async create(req: Express.AuthenticatedRequest<unknown, unknown, CreateAppointmentDto>) {
    const appointment = { ...req.body, workspace: req.workspace };

    await validateAppointment(appointment);

    return createAppointment(appointment);
  }
}
