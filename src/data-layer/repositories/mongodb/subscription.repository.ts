import { Subscription, type SubscriptionType } from '@domains';
import { ObjectId } from 'mongodb';

import { ISubscriptionRepository } from '../../interfaces';
import { Repository } from './base';
import { SubscriptionModel } from './db';

export class SubscriptionRepository
  extends Repository<SubscriptionModel, Subscription, SubscriptionType>
  implements ISubscriptionRepository
{
  constructor() {
    super(SubscriptionModel, Subscription);
  }

  async findOneByWorkspace(workspace: string) {
    const subscription = await this.repository.findOne({
      where: { workspace: new ObjectId(workspace) },
    });

    return subscription && this.domain.toDomain(subscription);
  }
}
