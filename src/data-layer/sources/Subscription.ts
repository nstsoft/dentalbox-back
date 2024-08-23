import type { SubscriptionEntity, SubscriptionType } from '@domains';

import { ISubscriptionRepository, ISubscriptionSource } from '../interfaces';
import { BaseSource } from './Base';

export class SubscriptionDataSource
  extends BaseSource<SubscriptionEntity, SubscriptionType>
  implements ISubscriptionSource
{
  protected repository: ISubscriptionRepository;

  constructor(repository: ISubscriptionRepository) {
    super(repository);
  }

  findOneByWorkspace(workspace: string) {
    return this.repository.findOneByWorkspace(workspace);
  }
}
