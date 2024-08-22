import { CabinetEntity, CabinetType } from '@domains';
import { Pagination } from '@utils';

import { ICabinetRepository, ICabinetSource } from '../interfaces';

export class CabinetDataSource implements ICabinetSource {
  private repository: ICabinetRepository;

  constructor(repository: ICabinetRepository) {
    this.repository = repository;
  }

  findAll(criteria: Partial<CabinetType>, pagination?: Pagination) {
    return this.repository.findAll(criteria, pagination);
  }

  findOneById(id: string) {
    return this.repository.findOneById(id);
  }

  findOneOrFail(criteria: Partial<CabinetType & { _id: string }>) {
    return this.repository.findOneOrFail(criteria);
  }

  create(data: CabinetType): Promise<CabinetEntity> {
    return this.repository.create(data);
  }

  updateOne(id: string, data: Partial<CabinetType>) {
    return this.repository.updateOne(id, data);
  }

  delete(id: string | string[]) {
    return this.repository.delete(id);
  }

  findByUserId(id: string) {
    return this.repository.findByUserId(id);
  }
}
