import { type ChairEntity, type ChairType } from '../../domains/types';
import { IDataSource, IRepositorySource } from './base.source';

export interface IChairRepository extends IRepositorySource<ChairEntity, ChairType> {}
export interface IChairSource extends IDataSource<ChairEntity, ChairType> {}
