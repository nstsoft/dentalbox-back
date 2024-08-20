import { IPlanRepository, IPlanSource } from '../interfaces';

export class PlanDataSource implements IPlanSource {
  private repository: IPlanRepository;

  constructor(repository: IPlanRepository) {
    this.repository = repository;
  }

  findAll() {
    return this.repository.findAll();
  }

  findOneById(id: string) {
    return this.repository.findOneById(id);
  }
}
