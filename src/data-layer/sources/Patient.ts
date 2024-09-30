import type { PatientEntity, PatientType } from '@domains';

import { IPatientRepository, IPatientSource } from '../interfaces';
import { BaseSource } from './Base';

export class PatientsDataSource
  extends BaseSource<PatientEntity, PatientType>
  implements IPatientSource
{
  protected repository: IPatientRepository;
}
