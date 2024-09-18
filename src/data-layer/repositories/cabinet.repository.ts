import { Cabinet, type CabinetType } from '@domains';

import { ICabinetRepository } from '../interfaces';
import { Repository } from './base';
import { CabinetModel } from './mongodb';

export class CabinetRepository
  extends Repository<CabinetModel, Cabinet, CabinetType>
  implements ICabinetRepository
{
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
}
