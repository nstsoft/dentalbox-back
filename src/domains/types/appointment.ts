import { BaseEntity } from '@utils';

export type AppointmentType = {
  start: string;
  end: string;
  workspace: string;
  patient: string;
  doctor: string;
  cabinet: string;
  chair?: string;
  notes?: string;
};

export type RawAppointment = AppointmentType & { _id: string };

export type AppointmentEntity = BaseEntity<RawAppointment> & {};

export type AppointmentListCriteria = {
  workspace: string;
  end: string;
  start: string;
};

export type AppointmentListFilter = {
  doctor?: string[];
  patient?: string[];
  cabinet?: string[];
};
