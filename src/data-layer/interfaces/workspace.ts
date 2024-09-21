import { type WorkspaceEntity, type WorkspaceType } from '../../domains/types';
import { IDataSource, IRepositorySource } from './base.source';

export interface IWorkspaceRepository extends IRepositorySource<WorkspaceEntity, WorkspaceType> {
  getManyByIds(ids: string[]): Promise<WorkspaceEntity[]>;
  getUserWorkspaces(ids: string): Promise<WorkspaceEntity[]>;
}
export interface IWorkspaceSource extends IDataSource<WorkspaceEntity, WorkspaceType> {
  getManyByIds(ids: string[]): Promise<WorkspaceEntity[]>;
  getUserWorkspaces(ids: string): Promise<WorkspaceEntity[]>;
}
