import { Plan, PlanType } from '@domains';
import { MongoRepository } from 'typeorm';

import { IPlanRepository } from '../interfaces';
import { Repository } from './base';
import { MongoSource, PlanModel } from './mongodb';

export class PlanRepository extends Repository<PlanModel, Plan, PlanType> implements IPlanRepository {
  repository: MongoRepository<PlanModel>;

  constructor() {
    super(PlanModel, Plan);
    this.repository = MongoSource.getMongoRepository(PlanModel);
  }

  async findAll() {
    const [data, count] = await this.repository.findAndCount({});

    return { count, data: Plan.toBatchDomain(data) };
  }
}
