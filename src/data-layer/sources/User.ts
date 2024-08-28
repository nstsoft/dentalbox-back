import { type UserEntity, type UserType } from '@domains';

import { IUserRepository, IUserSource } from '../interfaces';
import { BaseSource } from './Base';

export class UserDataSource extends BaseSource<UserEntity, UserType> implements IUserSource {
  protected repository: IUserRepository;

  constructor(repository: IUserRepository) {
    super(repository);
  }

  findOneByLogin(login: string) {
    return this.repository.findOneByLogin(login);
  }
}
