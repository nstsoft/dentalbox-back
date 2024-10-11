import { workspaceSource } from '@data';

export const getWorkspaceById = (id: string) => {
  return workspaceSource.findOneById(id);
};

export const getUserWorkspaces = async (ids: string[]) => {
  return workspaceSource.getManyByIds(ids);
};

export const getWorkspacesByUserId = async (userId: string) => {
  return workspaceSource.getUserWorkspaces(userId);
};
