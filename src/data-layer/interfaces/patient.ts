import type { PatientEntity, PatientSummaryListItem, PatientType } from '@domains';

import { IDataSource, IRepositorySource } from './base.source';

export interface IPatientRepository extends IRepositorySource<PatientEntity, PatientType> {}
export interface IPatientSource extends IDataSource<PatientEntity, PatientType> {
  getSummary(workspace: string): Promise<PatientSummaryListItem[]>;
}
