import { type PlanEntity, type PlanType } from '../../domains/types';
import { IDataSource, IRepositorySource } from './base.source';

export interface IPlanRepository extends IRepositorySource<PlanEntity, PlanType> {
  getAll(): Promise<PlanType[]>;
}
export interface IPlanSource extends IDataSource<PlanEntity, PlanType> {
  getAll(): Promise<PlanType[]>;
}
