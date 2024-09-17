import { chairSource } from '@data';
import { Pagination } from '@utils';

export const getChairsByWorkspaceId = async (workspace: string, pagination: Pagination) => {
  return chairSource.findAll({ workspace }, pagination);
};
export const getChairsByCabinet = async (cabinet: string, pagination: Pagination) => {
  return chairSource.findAll({ cabinet }, pagination);
};
