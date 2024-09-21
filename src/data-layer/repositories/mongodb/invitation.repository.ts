import { Invitation, type InvitationType } from '@domains';
import { MongoRepository } from 'typeorm';

import { IInvitationRepository } from '../../interfaces';
import { Repository } from './base';
import { InvitationModel } from './db';

export class InvitationRepository
  extends Repository<InvitationModel, Invitation, InvitationType>
  implements IInvitationRepository
{
  repository: MongoRepository<InvitationModel>;

  constructor() {
    super(InvitationModel, Invitation);
  }
}
