import { chairSource } from '@data';
import { ChairType } from '@domains';
import { Pagination } from '@utils';

export const getChairsByWorkspaceId = async (workspace: string, pagination: Pagination) => {
  return chairSource.findAll({ workspace }, pagination);
};
export const getChairsByCabinet = async (cabinet: string, pagination: Pagination) => {
  return chairSource.findAll({ cabinet }, pagination);
};
export const createChair = async (data: ChairType) => {
  return chairSource.create(data);
};
export const getChairsSummary = (workspace: string) => {
  return chairSource.getSummary(workspace);
};
