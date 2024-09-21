import type { Pagination } from '@utils';
import { FindOptionsOrder, FindOptionsWhere } from 'typeorm';

import { IDataSource, IRepositorySource } from '../interfaces';
import { FindAllCriteria } from '../types';
export abstract class BaseSource<T, C> implements IDataSource<T, C> {
  protected repository: IRepositorySource<T, C>;

  constructor(repository: IRepositorySource<T, C>) {
    this.repository = repository;
  }

  findAll(
    criteria: FindAllCriteria<C>,
    pagination?: Pagination,
    filter?: { [K: string]: unknown },
    orderBy?: FindOptionsOrder<C>,
  ) {
    return this.repository.findAll(criteria, pagination, filter, orderBy);
  }

  findOneById(id: string) {
    return this.repository.findOneById(id);
  }

  findOneOrFail(criteria: FindOptionsWhere<T & { _id?: string }>) {
    return this.repository.findOneOrFail(criteria);
  }

  create(data: C) {
    return this.repository.create(data);
  }

  updateOne(id: string, data: Partial<C>) {
    return this.repository.updateOne(id, data);
  }

  delete(id: string | string[]) {
    return this.repository.delete(id);
  }

  findOne(criteria: FindOptionsWhere<T & { _id?: string }>) {
    return this.repository.findOne(criteria);
  }

  upsert(criteria: Partial<T>, data: Partial<T>) {
    return this.repository.upsert(criteria, data);
  }

  update(criteria: FindOptionsWhere<T & { _id?: string }>, data: Partial<C>): Promise<unknown> {
    return this.repository.update(criteria, data);
  }
}
