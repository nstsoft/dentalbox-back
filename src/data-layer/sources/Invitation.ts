import type { InvitationEntity, InvitationType } from '@domains';

import { IInvitationRepository, IInvitationSource } from '../interfaces';
import { BaseSource } from './Base';

export class InvitationDataSource extends BaseSource<InvitationEntity, InvitationType> implements IInvitationSource {
  protected repository: IInvitationRepository;

  constructor(repository: IInvitationRepository) {
    super(repository);
  }
}
