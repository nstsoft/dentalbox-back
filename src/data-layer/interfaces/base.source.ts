import { Pagination } from '@utils';

export interface IDataSource<T, C> {
  findOneById(id: string): Promise<T | null>;
  create(data: C): Promise<T>;
  findOneOrFail(criteria: Partial<T>): Promise<T>;
  findAll(criteria: Partial<C>, pagination?: Pagination): Promise<{ count: number; data: T[] }>;
  delete(id: string | string[]): Promise<unknown>;
  updateOne(id: string, data: Partial<C>): Promise<unknown>;
}
