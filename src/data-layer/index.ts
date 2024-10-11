import {
  AppointmentRepository,
  CabinetRepository,
  CardRepository,
  ChairRepository,
  DentalMapRepository,
  InvitationRepository,
  MongoSource,
  PatientRepository,
  SubscriptionRepository,
  UserRepository,
  WorkspaceRepository,
} from './repositories/mongodb';
import {
  AppointmentDataSource,
  CabinetDataSource,
  CardDataSource,
  ChairDataSource,
  DentalMapDataSource,
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
const cardSource = new CardDataSource(new CardRepository());
const dentalMapSource = new DentalMapDataSource(new DentalMapRepository());
const appointmentSource = new AppointmentDataSource(new AppointmentRepository());

export {
  appointmentSource,
  cabinetSource,
  cardSource,
  chairSource,
  dentalMapSource,
  invitationSource,
  MongoSource,
  patientSource,
  subscriptionSource,
  userSource,
  workspaceSource,
};
