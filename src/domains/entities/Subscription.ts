import { RawSubscription } from '../types';
import { Base } from './Base';

export class Subscription extends Base {
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
