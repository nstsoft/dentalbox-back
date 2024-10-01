import { DentalMap, type DentalMapType } from '@domains';
import { ObjectId } from 'mongodb';
import { FindOptionsWhere } from 'typeorm';

import { IDentalMapRepository } from '../../interfaces';
import { Repository } from './base';
import { DentalMapModel } from './db';

export class DentalMapRepository
  extends Repository<DentalMapModel, DentalMap, DentalMapType>
  implements IDentalMapRepository
{
  constructor() {
    super(DentalMapModel, DentalMap);
  }

  findOneOrFail(criteria: FindOptionsWhere<DentalMapType & { _id?: string }>) {
    if (criteria.patient) {
      Object.assign(criteria, { patient: new ObjectId(criteria.patient as string) });
    }
    return super.findOneOrFail(criteria);
  }

  updateOneBy(criteria: Partial<DentalMapType>, data: Partial<DentalMapType>) {
    if (criteria.patient) {
      Object.assign(criteria, { patient: new ObjectId(criteria.patient as string) });
    }

    return super.updateOneBy(criteria, data);
  }
}
