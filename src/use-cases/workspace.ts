import { workspaceSource } from '@src/data-layer';

export const getWorkspaceById = (id: string) => {
  return workspaceSource.findOneById(id);
};

export const getUserWorkspaces = async (ids: string[]) => {
  return workspaceSource.getManyByIds(ids);
};
