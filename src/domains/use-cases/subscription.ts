import { subscriptionSource } from '@data';

export const getSubscriptionByWorkspace = (workspace: string) => {
  return subscriptionSource.findOneByWorkspace(workspace);
};
