import { BaseEntity } from '@utils';

export type CardType = {
  images: string[];
  notes?: string;
  patient: string;
};

export type RawCard = CardType & { _id: string };

export type CardEntity = BaseEntity<RawCard>;
