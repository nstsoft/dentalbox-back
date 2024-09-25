import type { InvitationEntity, InvitationType } from '@domains';
import { Pagination } from '@utils';

import { IInvitationRepository, IInvitationSource } from '../interfaces';
import { BaseSource } from './Base';

export class InvitationDataSource
  extends BaseSource<InvitationEntity, InvitationType>
  implements IInvitationSource
{
  protected repository: IInvitationRepository;

  constructor(repository: IInvitationRepository) {
    super(repository);
  }

  findByWorkspace(workspace: string, pagination?: Pagination) {
    return this.repository.findByWorkspace(workspace, pagination);
  }
}
