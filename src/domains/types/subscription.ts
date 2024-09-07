import { BaseEntity } from '@utils';

export type SubscriptionType = {
  workspace: string;
  product: string;
  priceId: string;
  stripeSubscription: string;
};

export type RawSubscription = SubscriptionType & { _id: string };

export type SubscriptionEntity = BaseEntity<RawSubscription>;
