import { RawSubscription } from '../types';
import { BaseEntity } from './Base';

export class Subscription extends BaseEntity {
  workspace: string;
  product: string;
  _id: string;
  priceId: string;
  stripeSubscription: string;

  constructor(data: RawSubscription) {
    super();
    this._id = data._id;
    this.workspace = data.workspace;
    this.product = data.product;
    this.priceId = data.priceId;
    this.stripeSubscription = data.stripeSubscription;
  }
}
