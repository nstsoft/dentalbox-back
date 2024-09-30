/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  CabinetType,
  ChairType,
  InvitationType,
  PatientType,
  SubscriptionType,
  UserType,
  WorkspaceType,
} from '@domains';
import { deepParseObjectId, type Pagination, removeUndefinedProps } from '@utils';
import { ObjectId } from 'mongodb';
import {
  type FindManyOptions,
  type FindOptionsOrder,
  type FindOptionsWhere,
  MongoRepository,
} from 'typeorm';

import { FindAllCriteria } from '../../types';
import {
  CabinetModel,
  ChairModel,
  InvitationModel,
  MongoSource,
  PatientModel,
  SubscriptionModel,
  UserModel,
  WorkspaceModel,
} from './db';

type Models =
  | UserModel
  | WorkspaceModel
  | SubscriptionModel
  | InvitationModel
  | CabinetModel
  | ChairModel
  | PatientModel;
type EntityData =
  | UserType
  | WorkspaceType
  | SubscriptionType
  | InvitationType
  | CabinetType
  | ChairType
  | PatientType;

export abstract class Repository<M extends Models, Domain, Data extends EntityData> {
  repository: MongoRepository<M>;
  model: new (...args: any[]) => M;
  domain: { toDomain: (model: M) => Domain; toBatchDomain: (model: M[]) => Domain[] };

  constructor(model: new (...args: any[]) => M, domain: new (...args: any[]) => Domain) {
    this.model = model;
    this.repository = MongoSource.getMongoRepository(model);
    this.domain = domain as unknown as {
      toDomain: (model: M) => Domain;
      toBatchDomain: (model: M[]) => Domain[];
    };
  }

  async findOneById(id: string) {
    const query = { _id: new ObjectId(id) };
    const data = await this.repository.findOneBy(query);

    return data && this.domain.toDomain({ ...data, _id: data._id.toString() });
  }

  async findAll(
    criteria: FindAllCriteria<Data>,
    pagination?: Pagination,
    filter?: FindManyOptions<Data>,
    orderBy?: FindOptionsOrder<new (...data: unknown[]) => M>,
  ) {
    const plain = deepParseObjectId(removeUndefinedProps(criteria));
    const params: FindManyOptions<new (...data: unknown[]) => M> = Object.keys(plain).length
      ? { ...filter, where: { ...plain, ...filter?.where } }
      : { ...filter };

    const order = orderBy ?? { _id: 'DESC' };

    const [data, count] = await this.repository.findAndCount({
      ...params,
      order,
      take: pagination?.limit ?? 0,
      skip: pagination?.skip ?? 0,
    });

    return { count, data: this.domain.toBatchDomain(data) };
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

  async findOneOrFail(criteria: FindOptionsWhere<Data & { _id?: string }>) {
    if (criteria._id) {
      Object.assign(criteria, { _id: new ObjectId(criteria._id as string) });
    }
    const found = await this.repository.findOneByOrFail(criteria);
    return this.domain.toDomain(found);
  }

  async findOne(criteria: FindOptionsWhere<Data & { _id?: string }>) {
    if (criteria && criteria._id) {
      Object.assign(criteria, { _id: new ObjectId(criteria._id as string) });
    }
    const found = await this.repository.findOne({ where: criteria });
    return found && this.domain.toDomain(found);
  }

  async upsert(criteria: Partial<Data & { _id?: string }>, data: Partial<Data>) {
    if (criteria._id) {
      Object.assign(criteria, { _id: new ObjectId(criteria._id) });
    }
    await this.repository.updateOne({ criteria }, { $set: data }, { upsert: true });

    const found = await this.repository.findOne({ where: criteria });
    return found && this.domain.toDomain(found);
  }

  async update(criteria: FindOptionsWhere<Data & { _id?: string }>, data: Partial<Data>) {
    if (criteria && criteria._id) {
      Object.assign(criteria, { _id: new ObjectId(criteria._id as string) });
    }
    return this.repository.updateMany({ where: criteria }, { $set: data });
  }
}
