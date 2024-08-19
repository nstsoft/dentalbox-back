import { type UserEntity, type UserType } from '../../domains/types';
import { IDataSource } from './base.source';

export interface IUserSource extends IDataSource<UserEntity, UserType> {}
