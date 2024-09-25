import type { InvitationEntity, InvitationType } from '@domains';
import { Pagination } from '@utils';

import { IDataSource, IRepositorySource } from './base.source';

export interface IInvitationRepository extends IRepositorySource<InvitationEntity, InvitationType> {
  findByWorkspace(
    workspace: string,
    pagination?: Pagination,
  ): Promise<{ count: number; data: InvitationEntity[] }>;
}
export interface IInvitationSource extends IDataSource<InvitationEntity, InvitationType> {
  findByWorkspace(
    workspace: string,
    pagination?: Pagination,
  ): Promise<{ count: number; data: InvitationEntity[] }>;
}
