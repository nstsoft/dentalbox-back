import {
  CabinetRepository,
  ChairRepository,
  InvitationRepository,
  MongoSource,
  SubscriptionRepository,
  UserRepository,
  WorkspaceRepository,
} from './repositories';
import {
  CabinetDataSource,
  ChairDataSource,
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
const chairSource = new ChairDataSource(new ChairRepository());

export {
  cabinetSource,
  chairSource,
  invitationSource,
  MongoSource,
  subscriptionSource,
  userSource,
  workspaceSource,
};
