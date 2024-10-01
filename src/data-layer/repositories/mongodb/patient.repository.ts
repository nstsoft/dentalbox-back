import { Patient, type PatientType } from '@domains';
import { ObjectId } from 'mongodb';
import { FindOptionsWhere } from 'typeorm';

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

  findOneOrFail(criteria: FindOptionsWhere<PatientType & { _id?: string }>) {
    if (criteria.workspace) {
      Object.assign(criteria, { workspace: new ObjectId(criteria.workspace as string) });
    }
    return super.findOneOrFail(criteria);
  }
}
