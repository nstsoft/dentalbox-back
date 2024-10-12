import { BaseEntity } from '@utils';

import { ChairType } from './chair';

export type CabinetType = {
  name: string;
  image?: string;
  notes?: string;
  address?: string;
  phone?: string;
  workspace: string;
};

export type RawCabinet = CabinetType & { _id: string };

export type CabinetEntity = BaseEntity<RawCabinet> & {
  setChairs(chairs: ChairType[]): void;
};

export type CabinetSummaryListItem = Pick<RawCabinet, 'name' | '_id' | 'image'>;
