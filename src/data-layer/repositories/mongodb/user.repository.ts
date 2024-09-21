import { User, type UserType } from '@domains';

import { IUserRepository } from '../../interfaces';
import { Repository } from './base';
import { UserModel } from './db';

export class UserRepository
  extends Repository<UserModel, User, UserType>
  implements IUserRepository
{
  constructor() {
    super(UserModel, User);
  }

  async findOneByLogin(login: string) {
    const found = await this.repository.findOne({
      where: { $or: [{ phone: login }, { email: login }] },
    });

    return found && this.domain.toDomain(found);
  }
}
