import { Plan } from '@domains';
import { ObjectId } from 'mongodb';
import { MongoRepository } from 'typeorm';

import { IPlanRepository } from '../interfaces';
import { MongoSource, PlanModel } from './mongodb';

export class PlanRepository implements IPlanRepository {
  repository: MongoRepository<PlanModel>;

  constructor() {
    this.repository = MongoSource.getMongoRepository(PlanModel);
  }

  async findOneById(id: string) {
    const query = { _id: new ObjectId(id) };
    const data = await this.repository.findOneBy(query);
    return data && Plan.toDomain({ ...data, _id: data._id.toString() });
  }

  async findAll() {
    const [data, count] = await this.repository.findAndCount({});

    return { count, data: Plan.toBatchDomain(data) };
  }
}
