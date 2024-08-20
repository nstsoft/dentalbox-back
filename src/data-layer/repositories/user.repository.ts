import { User, UserType } from '@domains';

import { IUserRepository } from '../interfaces';
import { Repository } from './base';
import { UserModel } from './mongodb';

export class UserRepository extends Repository<UserModel, User, UserType> implements IUserRepository {
  constructor() {
    super(UserModel, User);
  }
}
