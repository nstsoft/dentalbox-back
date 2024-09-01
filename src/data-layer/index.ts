import {
  CabinetRepository,
  InvitationRepository,
  MongoSource,
  SubscriptionRepository,
  UserRepository,
  WorkspaceRepository,
} from './repositories';
import {
  CabinetDataSource,
  InvitationDataSource,
  SubscriptionDataSource,
  UserDataSource,
  WorkspaceDataSource,
} from './sources';

const userSource = new UserDataSource(new UserRepository());
const invitationSource = new InvitationDataSource(new InvitationRepository());

const workspaceSource = new WorkspaceDataSource(new WorkspaceRepository());
const cabinetSource = new CabinetDataSource(new CabinetRepository());
const subscriptionSource = new SubscriptionDataSource(new SubscriptionRepository());

export { cabinetSource, invitationSource, MongoSource, subscriptionSource, userSource, workspaceSource };
