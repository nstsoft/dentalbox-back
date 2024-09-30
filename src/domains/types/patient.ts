import { BaseEntity } from '@utils';

export type PatientType = {
  email: string;
  name: string;
  address?: string;
  notes?: string;
  workspace: string;
  surname: string;
  secondName: string;
  phone: string;
  image?: string;
  dob: string;
};

export type RawPatient = PatientType & { _id: string };

export type PatientEntity = BaseEntity<RawPatient> & {};
