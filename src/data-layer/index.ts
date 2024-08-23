import {
  CabinetRepository,
  MongoSource,
  PlanRepository,
  SubscriptionRepository,
  UserRepository,
  WorkspaceRepository,
} from './repositories';
import {
  CabinetDataSource,
  PlanDataSource,
  SubscriptionDataSource,
  UserDataSource,
  WorkspaceDataSource,
} from './sources';

const userSource = new UserDataSource(new UserRepository());
const planSource = new PlanDataSource(new PlanRepository());
const workspaceSource = new WorkspaceDataSource(new WorkspaceRepository());
const cabinetSource = new CabinetDataSource(new CabinetRepository());
const subscriptionSource = new SubscriptionDataSource(new SubscriptionRepository());

export { cabinetSource, MongoSource, planSource, subscriptionSource, userSource, workspaceSource };
