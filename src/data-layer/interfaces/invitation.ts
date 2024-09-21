import { type InvitationEntity, type InvitationType } from '../../domains/types';
import { IDataSource, IRepositorySource } from './base.source';

export interface IInvitationRepository
  extends IRepositorySource<InvitationEntity, InvitationType> {}
export interface IInvitationSource extends IDataSource<InvitationEntity, InvitationType> {}
