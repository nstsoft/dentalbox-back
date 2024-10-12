import type { ChairEntity, ChairSummaryListItem, ChairType } from '@domains';
import { ObjectId } from 'mongodb';

import { IChairRepository, IChairSource } from '../interfaces';
import { BaseSource } from './Base';

export class ChairDataSource extends BaseSource<ChairEntity, ChairType> implements IChairSource {
  protected repository: IChairRepository;

  constructor(repository: IChairRepository) {
    super(repository);
  }

  getSummary(workspace: string): Promise<ChairSummaryListItem[]> {
    return this.repository
      .aggregate<ChairSummaryListItem>([
        { $match: { workspace: new ObjectId(workspace) } },
        { $project: { _id: 1, name: 1, cabinet: 1 } },
      ])
      .toArray();
  }
}
