import type { CabinetEntity, CabinetType } from '@domains';

import { ICabinetRepository, ICabinetSource } from '../interfaces';
import { BaseSource } from './Base';

export class CabinetDataSource extends BaseSource<CabinetEntity, CabinetType> implements ICabinetSource {
  protected repository: ICabinetRepository;

  constructor(repository: ICabinetRepository) {
    super(repository);
  }

  findByUserId(id: string) {
    return this.repository.findByUserId(id);
  }
}
