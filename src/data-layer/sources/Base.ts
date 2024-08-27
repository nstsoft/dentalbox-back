import type { Pagination } from '@utils';

import { IDataSource, IRepositorySource } from '../interfaces';
export abstract class BaseSource<T, C> implements IDataSource<T, C> {
  protected repository: IRepositorySource<T, C>;

  constructor(repository: IRepositorySource<T, C>) {
    this.repository = repository;
  }

  findAll(criteria: Partial<C>, pagination?: Pagination) {
    return this.repository.findAll(criteria, pagination);
  }

  findOneById(id: string) {
    return this.repository.findOneById(id);
  }

  findOneOrFail(criteria: Partial<T & { _id: string }>) {
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

  findOne(criteria: Partial<T>) {
    return this.repository.findOne(criteria);
  }

  upsert(criteria: Partial<T>, data: Partial<T>) {
    return this.repository.upsert(criteria, data);
  }
}
