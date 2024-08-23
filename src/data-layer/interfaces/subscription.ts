import { type SubscriptionEntity, type SubscriptionType } from '../../domains/types';
import { IDataSource, IRepositorySource } from './base.source';

export interface ISubscriptionRepository extends IRepositorySource<SubscriptionEntity, SubscriptionType> {
  findOneByWorkspace(workspace: string): Promise<SubscriptionEntity | null>;
}
export interface ISubscriptionSource extends IDataSource<SubscriptionEntity, SubscriptionType> {
  findOneByWorkspace(workspace: string): Promise<SubscriptionEntity | null>;
}
