import type { UserEntity, UserListFilter, UserType } from '@domains';
import type { Pagination } from '@utils';
import { ObjectId } from 'mongodb';
import { FindOptionsOrder } from 'typeorm';

import { IUserRepository, IUserSource } from '../interfaces';
import { FindAllCriteria } from '../types';
import { BaseSource } from './Base';

export class UserDataSource extends BaseSource<UserEntity, UserType> implements IUserSource {
  protected repository: IUserRepository;

  constructor(repository: IUserRepository) {
    super(repository);
  }

  findOneByLogin(login: string) {
    return this.repository.findOneByLogin(login);
  }

  findAll(
    criteria: FindAllCriteria<UserType>,
    pagination?: Pagination,
    filter?: UserListFilter,
    orderBy?: FindOptionsOrder<UserType>,
  ) {
    const matchFilter = { where: {} };
    let matchRoles;
    let matchSearch;

    if (filter?.role?.length) {
      const $elemMatch = {
        role: { $in: filter.role },
        ...(filter.workspace && { workspace: new ObjectId(filter.workspace) }),
      };
      matchRoles = { $elemMatch };
    }
    if (filter?.search) {
      matchSearch = {
        $or: [
          { email: { $regex: filter.search, $options: 'i' } },
          { surname: { $regex: filter.search, $options: 'i' } },
          { secondName: { $regex: filter.search, $options: 'i' } },
        ],
      };
    }

    if (matchRoles || matchSearch) {
      matchFilter.where = {
        roles: matchRoles,
        ...matchSearch,
      };
    }
    if (filter?.verified !== undefined) {
      matchFilter.where = {
        ...matchFilter.where,
        isVerified: filter?.verified,
      };
    }

    return this.repository.findAll(criteria, pagination, matchFilter, orderBy);
  }
}
