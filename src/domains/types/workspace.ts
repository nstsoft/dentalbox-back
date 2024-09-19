import { BaseEntity } from '@utils';

export type WorkspaceType = {
  name: string;
  image?: string;
  notes?: string;
  maxMembersCount: number;
  currentMembersCount: number;
};

export type RawWorkspace = WorkspaceType & { _id: string };

export type WorkspaceEntity = BaseEntity<RawWorkspace> & {
  canAcceptUser(): boolean;
};
