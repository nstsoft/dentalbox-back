import { PlanPeriod, RawPlan } from '../types';
import { Base } from './Base';

export class Plan extends Base {
  name: string;
  totalMembers: number;
  price: number;
  type: PlanPeriod;
  _id?: string;

  constructor({ totalMembers, name, price, _id, type }: RawPlan) {
    super();
    this.name = name;
    this.totalMembers = totalMembers;
    this.price = price;
    this._id = _id;
    this.type = type;
  }
}
