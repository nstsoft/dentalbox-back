import { type WorkspaceEntity, type WorkspaceType } from '../../domains/types';
import { IDataSource, IRepositorySource } from './base.source';

export interface IWorkspaceRepository extends IRepositorySource<WorkspaceEntity, WorkspaceType> {}
export interface IWorkspaceSource extends IDataSource<WorkspaceEntity, WorkspaceType> {}
