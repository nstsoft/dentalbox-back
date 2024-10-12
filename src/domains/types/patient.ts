import { BaseEntity, Sex } from '@utils';

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
  sex: Sex;
};

export type RawPatient = PatientType & { _id: string };

export type PatientEntity = BaseEntity<RawPatient> & {};

export type PatientSummaryListItem = Pick<
  RawPatient,
  'name' | 'surname' | 'secondName' | 'email' | 'phone' | '_id'
>;
