import { type WorkspaceEntity, type WorkspaceType } from '../../domains/types';
import { IDataSource } from './base.source';

export interface IWorkspaceRepository extends IDataSource<WorkspaceEntity, WorkspaceType> {}
export interface IWorkspaceSource extends IDataSource<WorkspaceEntity, WorkspaceType> {}
