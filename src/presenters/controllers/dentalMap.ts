import { DentalMapDto } from '@domains';
import { findPatientOrFail, getDentalMapByPatient, updateByPatient } from '@useCases';
import { BaseController, Controller, Get, Put, ValidateBody } from '@utils';

import { authenticate, verifySubscription } from '../middlewares';

@Controller('/dental-map', [authenticate(), verifySubscription()])
export class DentalMapController extends BaseController {
  @Get('/:patientId')
  async getByPatient(req: Express.AuthenticatedRequest) {
    const patient = await findPatientOrFail(req.params.patientId, req.workspace);
    return getDentalMapByPatient(patient._id);
  }

  @Put('/:patientId')
  @ValidateBody(DentalMapDto)
  async updateDentalMap(req: Express.AuthenticatedRequest) {
    const patient = await findPatientOrFail(req.params.patientId, req.workspace);

    return updateByPatient(patient._id, req.body);
  }
}
