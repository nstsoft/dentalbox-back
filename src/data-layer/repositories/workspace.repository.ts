import { Workspace, WorkspaceType } from '@domains';

import { IWorkspaceRepository } from '../interfaces';
import { Repository } from './base';
import { WorkspaceModel } from './mongodb';

export class WorkspaceRepository
  extends Repository<WorkspaceModel, Workspace, WorkspaceType>
  implements IWorkspaceRepository
{
  constructor() {
    super(WorkspaceModel, Workspace);
  }
}
