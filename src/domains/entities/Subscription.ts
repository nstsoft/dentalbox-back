import { RawSubscription, SubscriptionStatus } from '../types';
import { Base } from './Base';

export class Subscription extends Base {
  status: SubscriptionStatus;
  activeTill: number;
  workspace: string;
  product: string;
  _id: string;
  interval: string;
  priceId: string;
  stripeSubscription: string;

  constructor(data: RawSubscription) {
    super();
    this._id = data._id;
    this.status = data.status;
    this.activeTill = data.activeTill;
    this.workspace = data.workspace;
    this.product = data.product;
    this.interval = data.interval;
    this.priceId = data.priceId;
    this.stripeSubscription = data.stripeSubscription;
  }
}
