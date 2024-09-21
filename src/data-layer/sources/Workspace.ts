import type { WorkspaceEntity, WorkspaceType } from '@domains';

import { IWorkspaceRepository, IWorkspaceSource } from '../interfaces';
import { BaseSource } from './Base';

export class WorkspaceDataSource
  extends BaseSource<WorkspaceEntity, WorkspaceType>
  implements IWorkspaceSource
{
  protected repository: IWorkspaceRepository;

  constructor(repository: IWorkspaceRepository) {
    super(repository);
  }

  getManyByIds(ids: string[]) {
    return this.repository.getManyByIds(ids);
  }

  getUserWorkspaces(userId: string) {
    return this.repository.getUserWorkspaces(userId);
  }
}
