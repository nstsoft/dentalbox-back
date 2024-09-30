import { Patient, type PatientType } from '@domains';

import { IPatientRepository } from '../../interfaces';
import { Repository } from './base';
import { PatientModel } from './db';

export class PatientRepository
  extends Repository<PatientModel, Patient, PatientType>
  implements IPatientRepository
{
  constructor() {
    super(PatientModel, Patient);
  }
}
