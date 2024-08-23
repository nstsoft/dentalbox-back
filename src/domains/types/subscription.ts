import { BaseEntity } from '@utils';

export enum SubscriptionStatus {
  active = 'active',
  pending = 'pending',
  expired = 'expired',
  cancelled = 'cancelled',
}

export type SubscriptionType = {
  status: SubscriptionStatus;
  activeTill: number;
  workspace: string;
  plan: string;
  interval: string;
};

export type RawSubscription = SubscriptionType & { _id: string };

export type SubscriptionEntity = BaseEntity<RawSubscription>;
