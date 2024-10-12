import type { UserEntity, UserListFilter, UserSummaryListItem, UserType } from '@domains';
import { Pagination } from '@utils';
import type { FindOptionsOrder } from 'typeorm';

import { FindAllCriteria } from '../types';
import { IDataSource, IRepositorySource } from './base.source';

export interface IUserRepository extends IRepositorySource<UserEntity, UserType> {
  findOneByLogin(login: string): Promise<UserEntity | null>;
}
export interface IUserSource extends IDataSource<UserEntity, UserType> {
  findOneByLogin(login: string): Promise<UserEntity | null>;
  findAll(
    criteria: FindAllCriteria<UserType>,
    pagination?: Pagination,
    filter?: UserListFilter,
    orderBy?: FindOptionsOrder<UserType>,
  ): Promise<{ count: number; data: UserEntity[] }>;
  getSummary(workspace: string): Promise<UserSummaryListItem[]>;
}
