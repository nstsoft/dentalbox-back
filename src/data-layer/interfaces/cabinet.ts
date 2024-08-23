import { type CabinetEntity, type CabinetType } from '../../domains/types';
import { IDataSource, IRepositorySource } from './base.source';

export interface ICabinetRepository extends IRepositorySource<CabinetEntity, CabinetType> {
  findByUserId(id: string): Promise<CabinetEntity[]>;
}
export interface ICabinetSource extends IDataSource<CabinetEntity, CabinetType> {
  findByUserId(id: string): Promise<CabinetEntity[]>;
}
