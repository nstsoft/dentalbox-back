import { Workspace, WorkspaceType } from '@domains';
import { ObjectId } from 'mongodb';

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

  async getManyByIds(ids: string[]) {
    const result = await this.repository.find({ _id: { $in: ids.map((id) => new ObjectId(id)) } });

    return result && this.domain.toBatchDomain(result);
  }
}
