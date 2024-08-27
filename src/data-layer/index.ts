import {
  CabinetRepository,
  InvitationRepository,
  MongoSource,
  PlanRepository,
  SubscriptionRepository,
  UserRepository,
  WorkspaceRepository,
} from './repositories';
import {
  CabinetDataSource,
  InvitationDataSource,
  PlanDataSource,
  SubscriptionDataSource,
  UserDataSource,
  WorkspaceDataSource,
} from './sources';

const userSource = new UserDataSource(new UserRepository());
const invitationSource = new InvitationDataSource(new InvitationRepository());
const planSource = new PlanDataSource(new PlanRepository());
const workspaceSource = new WorkspaceDataSource(new WorkspaceRepository());
const cabinetSource = new CabinetDataSource(new CabinetRepository());
const subscriptionSource = new SubscriptionDataSource(new SubscriptionRepository());

export { cabinetSource, invitationSource, MongoSource, planSource, subscriptionSource, userSource, workspaceSource };
