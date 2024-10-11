import type {
  AppointmentEntity,
  AppointmentListCriteria,
  AppointmentListFilter,
  AppointmentType,
} from '@domains';
import { Pagination } from '@utils';
import { ObjectId } from 'mongodb';

import { IAppointmentRepository, IAppointmentSource } from '../interfaces';
import { BaseSource } from './Base';

export class AppointmentDataSource
  extends BaseSource<AppointmentEntity, AppointmentType>
  implements IAppointmentSource
{
  protected repository: IAppointmentRepository;

  constructor(repository: IAppointmentRepository) {
    super(repository);
  }

  async getAppointmentList(
    criteria: AppointmentListCriteria,
    pagination?: Pagination,
    filter?: AppointmentListFilter,
  ) {
    const searchCriteria = { workspace: criteria.workspace };

    const $and: unknown[] = [
      { end: { $lte: new Date(criteria.end) } },
      { start: { $gte: new Date(criteria.start) } },
    ];

    if (filter?.doctor?.length) {
      const doctor = { $in: filter.doctor.map((d) => new ObjectId(d)) };
      $and.push({ doctor });
    }
    if (filter?.patient?.length) {
      const patient = { $in: filter.patient.map((d) => new ObjectId(d)) };
      $and.push({ patient });
    }
    if (filter?.cabinet?.length) {
      const cabinet = { $in: filter.cabinet.map((d) => new ObjectId(d)) };
      $and.push({ cabinet });
    }

    const { data } = await this.repository.findAll(searchCriteria, pagination, { where: { $and } });

    return data;
  }
}
