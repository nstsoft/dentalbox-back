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

type Person = {
  _id: string;
  name: string;
  surname: string;
  secondName: string;
  email: string;
  phone: string;
};

export type AppointmentListItem = AppointmentType & {
  patient: Person;
  doctor: Person;
  cabinet: { _id: string; name: string };
  chair?: { _id: string; name: string };
};

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
