import { config } from '@config';
import { DataSource } from 'typeorm';

import { CabinetModel, ChairModel, InvitationModel, SubscriptionModel, UserModel, WorkspaceModel } from './models';

const url = config.DATABASE_URL.replace('{user}', config.DATABASE_USER)
  .replace('{password}', config.DATABASE_PASSWORD)
  .replace('{database}', config.DATABASE);

export { CabinetModel, ChairModel, InvitationModel, SubscriptionModel, UserModel, WorkspaceModel };

export const MongoSource = new DataSource({
  url,
  type: 'mongodb',
  synchronize: true,
  logging: false,
  entities: [UserModel, WorkspaceModel, CabinetModel, SubscriptionModel, InvitationModel, ChairModel],
});
