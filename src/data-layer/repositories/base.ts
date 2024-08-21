/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlanType, UserType, WorkspaceType } from '@domains';
import { deepParseObjectId, type Pagination, removeUndefinedProps } from '@utils';
import { ObjectId } from 'mongodb';
import { type FindManyOptions, type FindOptionsOrder, MongoRepository } from 'typeorm';

import { MongoSource, PlanModel, UserModel, WorkspaceModel } from './mongodb';

type Models = UserModel | PlanModel | WorkspaceModel;
type EntityData = UserType | WorkspaceType | PlanType;

export abstract class Repository<M extends Models, Domain, Data extends EntityData> {
  repository: MongoRepository<M>;
  model: new (...args: any[]) => M;
  domain: { toDomain: (model: M) => Domain; toBatchDomain: (model: M[]) => Domain[] };

  constructor(model: new (...args: any[]) => M, domain: new (...args: any[]) => Domain) {
    this.model = model;
    this.repository = MongoSource.getMongoRepository(model);
    this.domain = domain as unknown as { toDomain: (model: M) => Domain; toBatchDomain: (model: M[]) => Domain[] };
  }

  async findOneById(id: string) {
    const query = { _id: new ObjectId(id) };
    const data = await this.repository.findOneBy(query);

    return data && this.domain.toDomain({ ...data, _id: data._id.toString() });
  }

  async findAll(criteria: Partial<Data>, pagination?: Pagination) {
    const plain = deepParseObjectId(removeUndefinedProps(criteria));

    const params: FindManyOptions<new (...data: unknown[]) => M> = Object.keys(plain).length ? { where: plain } : {};
    const order: FindOptionsOrder<new (...data: unknown[]) => M> = { _id: 'DESC' };

    const [data, count] = await this.repository.findAndCount({
      ...params,
      order,
      take: pagination?.limit ?? 0,
      skip: pagination?.skip ?? 0,
    });

    return {
      count,
      data: this.domain.toBatchDomain(data),
    };
  }

  async create(data: Data) {
    const created = new this.model(data);
    const saved = await this.repository.save(created);
    return this.domain.toDomain(saved);
  }

  async delete(id: string | string[]) {
    return this.repository.delete(id);
  }

  async updateOne(_id: string, data: Partial<Data & { _id?: string }>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id: _, ...parsed } = data;

    return this.repository.update(_id, parsed as any);
  }

  async findOneOrFail(criteria: Partial<Data & { _id?: string }>) {
    if (criteria._id) {
      Object.assign(criteria, { _id: new ObjectId(criteria._id) });
    }
    const found = await this.repository.findOneByOrFail(criteria);
    console.log('----------------', JSON.stringify(found, null, 2));
    return this.domain.toDomain(found);
  }
}
