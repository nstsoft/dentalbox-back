import { BaseEntity } from '@utils';

export enum PlanPeriod {
  weekly = 'weekly',
  monthly = 'monthly',
  annual = 'annual',
}

export type PlanType = {
  name: string;
  totalMembers: number;
  price: number;
  type: PlanPeriod;
};

export type RawPlan = PlanType & {
  _id: string;
};

export type PlanEntity = BaseEntity<RawPlan>;
