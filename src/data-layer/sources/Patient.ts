import type { PatientEntity, PatientType } from '@domains';
import type { Pagination } from '@utils';
import { FindOptionsOrder } from 'typeorm';

import { IPatientRepository, IPatientSource } from '../interfaces';
import { FindAllCriteria } from '../types';
import { BaseSource } from './Base';

export class PatientsDataSource
  extends BaseSource<PatientEntity, PatientType>
  implements IPatientSource
{
  protected repository: IPatientRepository;

  constructor(repository: IPatientRepository) {
    super(repository);
  }

  findAll(
    criteria: FindAllCriteria<PatientType>,
    pagination?: Pagination,
    filter?: { search?: string },
    orderBy?: FindOptionsOrder<PatientType>,
  ) {
    const matchFilter = { where: {} };
    let matchSearch = {};

    if (filter?.search) {
      matchSearch = {
        $or: [
          { name: { $regex: filter.search, $options: 'i' } },
          { surname: { $regex: filter.search, $options: 'i' } },
          { secondName: { $regex: filter.search, $options: 'i' } },
          { address: { $regex: filter.search, $options: 'i' } },
          { email: { $regex: filter.search, $options: 'i' } },
        ],
      };
    }

    matchFilter.where = matchSearch;

    return this.repository.findAll(criteria, pagination, matchFilter, orderBy);
  }
}
