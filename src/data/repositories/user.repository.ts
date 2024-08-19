import { User, UserType } from '@domains';
import { UserModel } from '@repositories';
import { deepParseObjectId, type Pagination, removeUndefinedProps } from '@utils';
import { ObjectId } from 'mongodb';
import { FindOptionsOrder, MongoRepository } from 'typeorm';

import { IUserRepository } from '../interfaces';
import { MongoSource } from './mongodb';

export class UsetRepository implements IUserRepository {
  repository: MongoRepository<UserModel>;

  constructor() {
    console.log('------------');
    this.repository = MongoSource.getMongoRepository(UserModel);
  }

  async findOneById(id: string) {
    const query = { _id: new ObjectId(id) };
    const data = await this.repository.findOneBy(query);
    return data && User.toDomain({ ...data, _id: data._id.toString() });
  }

  async create(data: UserType) {
    const created = new UserModel(data);
    const saved = await this.repository.save(created);
    return User.toDomain(saved);
  }

  async delete(id: string | string[]) {
    return this.repository.delete(id);
  }

  async findAll(criteria: Partial<UserType>, pagination?: Pagination) {
    const plain = deepParseObjectId(removeUndefinedProps(criteria));

    const params = Object.keys(plain).length ? { where: plain } : {};
    const order: FindOptionsOrder<UserModel> = { _id: 'DESC' };

    const [data, count] = await this.repository.findAndCount({
      ...params,
      order,
      take: pagination?.limit ?? 0,
      skip: pagination?.skip ?? 0,
    });

    return { count, data: User.toBatchDomain(data) };
  }

  async findOne(criteria: UserType) {
    const event = await this.repository.findOneByOrFail(criteria);
    return User.toDomain(event);
  }

  async updateOne(_id: string, data: Partial<UserType>) {
    return this.repository.update(_id, data);
  }
}
