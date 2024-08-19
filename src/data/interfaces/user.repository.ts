import { type UserEntity, type UserType } from '../../domains/types';
import { IDataSource } from './base.source';

export interface IUserRepository extends IDataSource<UserEntity, UserType> {}
