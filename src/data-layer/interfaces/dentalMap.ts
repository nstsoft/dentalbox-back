import type { DentalMapEntity, DentalMapType } from '../../domains/types';
import { IDataSource, IRepositorySource } from './base.source';

export interface IDentalMapRepository extends IRepositorySource<DentalMapEntity, DentalMapType> {}
export interface IDentalMapSource extends IDataSource<DentalMapEntity, DentalMapType> {}
