import { BaseEntity } from '@utils';

export type CabinetType = {
  name: string;
  image?: string;
  notes?: string;
  address?: string;
  phone?: string;
  workspace: string;
};

export type RawCabinet = CabinetType & { _id: string };

export type CabinetEntity = BaseEntity<RawCabinet>;
