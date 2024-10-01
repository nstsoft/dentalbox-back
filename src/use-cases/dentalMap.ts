import { dentalMapSource } from '@data';
import { DentalMap } from '@domains';
import { flattenObject } from '@utils';

export const createDentalMap = async (data: { patient: string; notes?: string }) => {
  const dentalMap = new DentalMap(data);
  dentalMap.resetChart();
  return dentalMapSource.create(dentalMap);
};

export const getDentalMapByPatient = async (patient: string) => {
  return dentalMapSource.findOneOrFail({ patient });
};

export const updateByPatient = async (patient: string, data: any) => {
  return dentalMapSource.updateOneBy({ patient }, flattenObject(data));
};
