import { workspaceSource } from '@src/data-layer';

export const getWorkspaceById = (id: string) => {
  return workspaceSource.findOneById(id);
};
