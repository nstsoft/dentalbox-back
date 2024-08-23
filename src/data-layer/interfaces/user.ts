import { type UserEntity, type UserType } from '../../domains/types';
import { IDataSource, IRepositorySource } from './base.source';

export interface IUserRepository extends IRepositorySource<UserEntity, UserType> {}
export interface IUserSource extends IDataSource<UserEntity, UserType> {}
