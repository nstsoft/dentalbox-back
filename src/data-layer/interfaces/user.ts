import { type UserEntity, type UserType } from '@domains';

import { IDataSource, IRepositorySource } from './base.source';

export interface IUserRepository extends IRepositorySource<UserEntity, UserType> {
  findOneByLogin(login: string): Promise<UserEntity | null>;
}
export interface IUserSource extends IDataSource<UserEntity, UserType> {
  findOneByLogin(login: string): Promise<UserEntity | null>;
}
