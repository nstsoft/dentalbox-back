import { Plan, type PlanType } from '@domains';
import { MongoRepository } from 'typeorm';

import { IPlanRepository } from '../interfaces';
import { Repository } from './base';
import { PlanModel } from './mongodb';

export class PlanRepository extends Repository<PlanModel, Plan, PlanType> implements IPlanRepository {
  repository: MongoRepository<PlanModel>;

  constructor() {
    super(PlanModel, Plan);
  }

  async getAll() {
    return this.repository.find({});
  }
}
