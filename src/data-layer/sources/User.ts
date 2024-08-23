import type { UserEntity, UserType } from '@domains';

import { IUserRepository, IUserSource } from '../interfaces';
import { BaseSource } from './Base';

export class UserDataSource extends BaseSource<UserEntity, UserType> implements IUserSource {
  protected repository: IUserRepository;

  constructor(repository: IUserRepository) {
    super(repository);
  }
}
