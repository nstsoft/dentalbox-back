import { BaseEntity } from '@utils';

export type ChairType = {
  name: string;
  notes?: string;
  cabinet: string;
  workspace: string;
};

export type RawChair = ChairType & { _id: string };

export type ChairEntity = BaseEntity<RawChair>;
export type ChairSummaryListItem = Pick<RawChair, 'name' | '_id' | 'cabinet'>;
