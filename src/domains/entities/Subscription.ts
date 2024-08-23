import { RawSubscription, SubscriptionStatus } from '../types';
import { Base } from './Base';

export class Subscription extends Base {
  status: SubscriptionStatus;
  activeTill: number;
  workspace: string;
  plan: string;
  _id: string;
  interval: string;

  constructor(data: RawSubscription) {
    super();
    this.status = data.status;
    this.activeTill = data.activeTill;
    this.workspace = data.workspace;
    this.plan = data.plan;
    this.interval = data.interval;
    this._id = data._id;
  }
}
