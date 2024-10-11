import { Appointment, type AppointmentType } from '@domains';

import { IAppointmentRepository } from '../../interfaces';
import { Repository } from './base';
import { AppointmentModel } from './db';

export class AppointmentRepository
  extends Repository<AppointmentModel, Appointment, AppointmentType>
  implements IAppointmentRepository
{
  constructor() {
    super(AppointmentModel, Appointment);
  }
}
