import { BaseEntity } from '@utils';

export type WorkspaceType = {
  name: string;
  image: string;
  description: string;
};

export type RawWorkspace = WorkspaceType & {
  _id?: string;
};

export type WorkspaceEntity = BaseEntity<RawWorkspace>;
