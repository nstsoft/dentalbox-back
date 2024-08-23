import type { PlanEntity, PlanType } from '@domains';

import { IPlanRepository, IPlanSource } from '../interfaces';
import { BaseSource } from './Base';

export class PlanDataSource extends BaseSource<PlanEntity, PlanType> implements IPlanSource {
  protected repository: IPlanRepository;

  constructor(repository: IPlanRepository) {
    super(repository);
  }

  getAll() {
    return this.repository.getAll();
  }
}
