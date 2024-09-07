import { BaseEntity } from '@utils';

export type WorkspaceType = {
  name: string;
  image?: string;
  description: string;
  maxMembersCount: number;
  currentMembersCount: number;
};

export type RawWorkspace = WorkspaceType & { _id: string };

export type WorkspaceEntity = BaseEntity<RawWorkspace>;
