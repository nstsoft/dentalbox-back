import type { ChairEntity, ChairSummaryListItem, ChairType } from '@domains';

import { IDataSource, IRepositorySource } from './base.source';

export interface IChairRepository extends IRepositorySource<ChairEntity, ChairType> {}
export interface IChairSource extends IDataSource<ChairEntity, ChairType> {
  getSummary(workspace: string): Promise<ChairSummaryListItem[]>;
}
