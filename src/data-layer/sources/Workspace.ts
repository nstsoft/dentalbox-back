import { WorkspaceEntity, WorkspaceType } from '@domains';
import { Pagination } from '@utils';

import { IWorkspaceRepository, IWorkspaceSource } from '../interfaces';

export class WorkspaceDataSource implements IWorkspaceSource {
  private repository: IWorkspaceRepository;

  constructor(repository: IWorkspaceRepository) {
    this.repository = repository;
  }

  findAll(criteria: Partial<WorkspaceType>, pagination?: Pagination) {
    return this.repository.findAll(criteria, pagination);
  }

  findOneById(id: string) {
    return this.repository.findOneById(id);
  }

  findOneOrFail(criteria: Partial<WorkspaceType & { _id: string }>) {
    return this.repository.findOneOrFail(criteria);
  }

  create(data: WorkspaceType): Promise<WorkspaceEntity> {
    return this.repository.create(data);
  }

  updateOne(id: string, data: Partial<WorkspaceType>) {
    return this.repository.updateOne(id, data);
  }

  delete(id: string | string[]) {
    return this.repository.delete(id);
  }
}
