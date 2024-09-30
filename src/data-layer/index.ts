import {
  CabinetRepository,
  ChairRepository,
  InvitationRepository,
  MongoSource,
  PatientRepository,
  SubscriptionRepository,
  UserRepository,
  WorkspaceRepository,
} from './repositories/mongodb';
import {
  CabinetDataSource,
  ChairDataSource,
  InvitationDataSource,
  PatientsDataSource,
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
const patientSource = new PatientsDataSource(new PatientRepository());

export {
  cabinetSource,
  chairSource,
  invitationSource,
  MongoSource,
  patientSource,
  subscriptionSource,
  userSource,
  workspaceSource,
};
