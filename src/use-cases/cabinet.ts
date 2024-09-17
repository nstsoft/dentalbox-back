import { cabinetSource } from '@data';
import { Pagination } from '@utils';

export const getCabinetsByWorkspaceId = async (workspace: string, pagination: Pagination) => {
  return cabinetSource.findAll({ workspace }, pagination);
};
