import type { CabinetEntity, CabinetSummaryListItem, CabinetType } from '@domains';
import type { Pagination } from '@utils';
import { ObjectId } from 'mongodb';
import { FindOptionsOrder } from 'typeorm';

import { ICabinetRepository, ICabinetSource } from '../interfaces';
import { FindAllCriteria } from '../types';
import { BaseSource } from './Base';

export class CabinetDataSource
  extends BaseSource<CabinetEntity, CabinetType>
  implements ICabinetSource
{
  protected repository: ICabinetRepository;

  constructor(repository: ICabinetRepository) {
    super(repository);
  }

  findByUserId(id: string) {
    return this.repository.findByUserId(id);
  }

  findAll(
    criteria: FindAllCriteria<CabinetType>,
    pagination?: Pagination,
    filter?: { search?: string },
    orderBy?: FindOptionsOrder<CabinetType>,
  ) {
    const matchFilter = { where: {} };
    let matchSearch = {};

    if (filter?.search) {
      matchSearch = {
        $or: [
          { name: { $regex: filter.search, $options: 'i' } },
          { address: { $regex: filter.search, $options: 'i' } },
        ],
      };
    }

    matchFilter.where = matchSearch;

    return this.repository.findAll(criteria, pagination, matchFilter, orderBy);
  }

  getSummary(workspace: string): Promise<CabinetSummaryListItem[]> {
    return this.repository
      .aggregate<CabinetSummaryListItem>([
        { $match: { workspace: new ObjectId(workspace) } },
        { $project: { _id: 1, name: 1, image: 1 } },
      ])
      .toArray();
  }
}
