import type { WorkspaceEntity, WorkspaceType } from '@domains';

import { IWorkspaceRepository, IWorkspaceSource } from '../interfaces';
import { BaseSource } from './Base';

export class WorkspaceDataSource extends BaseSource<WorkspaceEntity, WorkspaceType> implements IWorkspaceSource {
  protected repository: IWorkspaceRepository;

  constructor(repository: IWorkspaceRepository) {
    super(repository);
  }
}
