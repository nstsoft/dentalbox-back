import { Invitation, type InvitationType } from '@domains';
import { Pagination } from '@utils';
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

  async findByWorkspace(workspace: string, pagination?: Pagination) {
    const [data, count] = await this.repository.findAndCount({
      where: { workspace },
      take: pagination?.limit ?? 0,
      skip: pagination?.skip ?? 0,
    });

    return { count, data: this.domain.toBatchDomain(data) };
  }
}
