import { planSource } from '@data';

export const getPlanById = (id: string) => {
  return planSource.findOneById(id);
};

export const getAllPlans = async () => {
  return planSource.getAll();
};
