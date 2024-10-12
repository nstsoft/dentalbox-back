import type {
  AppointmentEntity,
  AppointmentListCriteria,
  AppointmentListFilter,
  AppointmentType,
} from '@domains';

import { IDataSource, IRepositorySource } from './base.source';

export interface IAppointmentRepository
  extends IRepositorySource<AppointmentEntity, AppointmentType> {}

export interface IAppointmentSource extends IDataSource<AppointmentEntity, AppointmentType> {
  getAppointmentList(
    criteria: AppointmentListCriteria,
    filter: AppointmentListFilter,
  ): Promise<AppointmentEntity[]>;
}
