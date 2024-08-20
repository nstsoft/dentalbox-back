import { type PlanType } from '../../domains/types';

export interface IPlanRepository {
  findOneById(id: string): Promise<PlanType | null>;
  findAll(): Promise<{ count: number; data: PlanType[] }>;
}
export interface IPlanSource {
  findOneById(id: string): Promise<PlanType | null>;
  findAll(): Promise<{ count: number; data: PlanType[] }>;
}
