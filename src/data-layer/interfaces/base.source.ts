import { Pagination } from '@utils';
import type {
  AggregateOptions,
  AggregationCursor,
  FindManyOptions,
  FindOptionsOrder,
  FindOptionsWhere,
  ObjectLiteral,
} from 'typeorm';

import { FindAllCriteria } from '../types';

export interface IDataSource<T, C> {
  findOneById(id: string): Promise<T | null>;
  create(data: C): Promise<T>;
  findOne(criteria: FindOptionsWhere<T & { _id?: string }>): Promise<T | null>;
  findOneOrFail(criteria: FindOptionsWhere<T & { _id?: string }>): Promise<T>;
  findAll(
    criteria: FindAllCriteria<C>,
    pagination?: Pagination,
    filter?: { [K: string]: unknown },
    orderBy?: FindOptionsOrder<C>,
  ): Promise<{ count: number; data: T[] }>;
  delete(id: string | string[]): Promise<unknown>;
  updateOne(id: string, data: Partial<C>): Promise<unknown>;
  update(criteria: FindOptionsWhere<T & { _id?: string }>, data: Partial<C>): Promise<unknown>;
  upsert(criteria: Partial<T>, data: Partial<T>): Promise<unknown>;
  updateOneBy(criteria: Partial<T>, data: Partial<T>): Promise<unknown>;
}

export interface IRepositorySource<T, C> {
  findOneById(id: string): Promise<T | null>;
  create(data: C): Promise<T>;
  findOneOrFail(criteria: FindOptionsWhere<T & { _id?: string }>): Promise<T>;
  findOne(criteria: FindOptionsWhere<T & { _id?: string }>): Promise<T | null>;
  findAll(
    criteria: FindAllCriteria<C>,
    pagination?: Pagination,
    filter?: FindManyOptions<unknown>,
    orderBy?: FindOptionsOrder<C>,
  ): Promise<{ count: number; data: T[] }>;
  delete(id: string | string[]): Promise<unknown>;
  updateOne(id: string, data: Partial<C>): Promise<unknown>;
  upsert(criteria: Partial<T>, data: Partial<T>): Promise<unknown>;
  update(criteria: FindOptionsWhere<T & { _id?: string }>, data: Partial<C>): Promise<unknown>;
  updateOneBy(criteria: Partial<T>, data: Partial<T>): Promise<unknown>;
  aggregate: <A = any>(
    pipeline: ObjectLiteral[],
    options?: AggregateOptions,
  ) => AggregationCursor<A>;
}
