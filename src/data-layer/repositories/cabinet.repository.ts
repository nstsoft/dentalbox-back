import { Cabinet, type CabinetType } from '@domains';
import { ObjectId } from 'mongodb';

import { ICabinetRepository } from '../interfaces';
import { Repository } from './base';
import { CabinetModel } from './mongodb';

export class CabinetRepository extends Repository<CabinetModel, Cabinet, CabinetType> implements ICabinetRepository {
  constructor() {
    super(CabinetModel, Cabinet);
  }

  async findByUserId(id: string) {
    const response = (await this.repository
      .createQueryBuilder('cabinet')
      .leftJoinAndSelect('cabinet.users', 'users')
      .where('users.id = :id', { id })
      .getMany()) as unknown as CabinetType[];

    return Cabinet.toBatchDomain(response);
  }

  async updateOne(_id: string, data: Partial<CabinetType & { _id?: string }>) {
    if (data.chairs) {
      Object.assign(data, { users: data.chairs.map((chair) => new ObjectId(chair)) });
    }

    return this.repository.update(_id, data);
  }
}
