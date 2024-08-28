import { Pagination } from '@utils';
import { FindOptionsWhere } from 'typeorm';

export interface IDataSource<T, C> {
  findOneById(id: string): Promise<T | null>;
  create(data: C): Promise<T>;
  findOne(criteria: FindOptionsWhere<T & { _id?: string }>): Promise<T | null>;
  findOneOrFail(criteria: FindOptionsWhere<T & { _id?: string }>): Promise<T>;
  findAll(criteria: Partial<C>, pagination?: Pagination): Promise<{ count: number; data: T[] }>;
  delete(id: string | string[]): Promise<unknown>;
  updateOne(id: string, data: Partial<C>): Promise<unknown>;
  upsert(criteria: Partial<T>, data: Partial<T>): Promise<unknown>;
}
export interface IRepositorySource<T, C> {
  findOneById(id: string): Promise<T | null>;
  create(data: C): Promise<T>;
  findOneOrFail(criteria: FindOptionsWhere<T & { _id?: string }>): Promise<T>;
  findOne(criteria: FindOptionsWhere<T & { _id?: string }>): Promise<T | null>;
  findAll(criteria: Partial<C>, pagination?: Pagination): Promise<{ count: number; data: T[] }>;
  delete(id: string | string[]): Promise<unknown>;
  updateOne(id: string, data: Partial<C>): Promise<unknown>;
  upsert(criteria: Partial<T>, data: Partial<T>): Promise<unknown>;
}
