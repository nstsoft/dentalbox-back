import type { PatientEntity, PatientSummaryListItem, PatientType } from '@domains';
import type { Pagination } from '@utils';
import { ObjectId } from 'mongodb';
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

  getSummary(workspace: string): Promise<PatientSummaryListItem[]> {
    const $project = { _id: 1, name: 1, surname: 1, secondName: 1, email: 1, phone: 1 };
    return this.repository
      .aggregate<PatientSummaryListItem>([
        { $match: { workspace: new ObjectId(workspace) } },
        { $project },
      ])
      .toArray();
  }
}
