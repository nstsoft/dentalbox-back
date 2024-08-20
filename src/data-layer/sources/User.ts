import { UserEntity, UserType } from '@domains';
import { Pagination } from '@utils';

import { IUserRepository, IUserSource } from '../interfaces';

export class UserDataSource implements IUserSource {
  private repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  findAll(criteria: Partial<UserType>, pagination?: Pagination) {
    return this.repository.findAll(criteria, pagination);
  }

  findOneById(id: string) {
    return this.repository.findOneById(id);
  }

  findOneOrFail(criteria: Partial<UserType & { _id: string }>) {
    return this.repository.findOneOrFail(criteria);
  }

  create(data: UserType & { workspace?: string }): Promise<UserEntity> {
    return this.repository.create(data);
  }

  updateOne(id: string, data: Partial<UserType>) {
    return this.repository.updateOne(id, data);
  }

  delete(id: string | string[]) {
    return this.repository.delete(id);
  }
}
