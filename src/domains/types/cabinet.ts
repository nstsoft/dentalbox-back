import { BaseEntity } from '@utils';

export type CabinetType = {
  name: string;
  image: string;
  description: string;
  address: string;
  phone: string;
  chairs: string[];
  workspace: string;
};

export type RawCabinet = CabinetType & { _id: string };

export type CabinetEntity = BaseEntity<RawCabinet>;
