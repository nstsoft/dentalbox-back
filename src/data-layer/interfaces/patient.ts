import type { PatientEntity, PatientType } from '../../domains/types';
import { IDataSource, IRepositorySource } from './base.source';

export interface IPatientRepository extends IRepositorySource<PatientEntity, PatientType> {}
export interface IPatientSource extends IDataSource<PatientEntity, PatientType> {}
