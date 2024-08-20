import { Workspace, WorkspaceType } from '@domains';
import { deepParseObjectId, type Pagination, removeUndefinedProps } from '@utils';
import { ObjectId } from 'mongodb';
import { FindOptionsOrder, MongoRepository } from 'typeorm';

import { IWorkspaceRepository } from '../interfaces';
import { MongoSource, WorkspaceModel } from './mongodb';

export class WorkspaceRepository implements IWorkspaceRepository {
  repository: MongoRepository<WorkspaceModel>;

  constructor() {
    this.repository = MongoSource.getMongoRepository(WorkspaceModel);
  }

  async findOneById(id: string) {
    const query = { _id: new ObjectId(id) };
    const data = await this.repository.findOneBy(query);
    return data && Workspace.toDomain({ ...data, _id: data._id.toString() });
  }

  async create(data: WorkspaceType) {
    const created = new WorkspaceModel(data);
    const saved = await this.repository.save(created);
    return Workspace.toDomain(saved);
  }

  async delete(id: string | string[]) {
    return this.repository.delete(id);
  }

  async findAll(criteria: Partial<WorkspaceType>, pagination?: Pagination) {
    const plain = deepParseObjectId(removeUndefinedProps(criteria));

    const params = Object.keys(plain).length ? { where: plain } : {};
    const order: FindOptionsOrder<WorkspaceModel> = { _id: 'DESC' };

    const [data, count] = await this.repository.findAndCount({
      ...params,
      order,
      take: pagination?.limit ?? 0,
      skip: pagination?.skip ?? 0,
    });

    return { count, data: Workspace.toBatchDomain(data) };
  }

  async findOneOrFail(criteria: WorkspaceType & { _id?: string }) {
    if (criteria._id) {
      Object.assign(criteria, { _id: new ObjectId(criteria._id) });
    }
    const event = await this.repository.findOneByOrFail(criteria);
    return Workspace.toDomain(event);
  }

  async updateOne(_id: string, data: Partial<WorkspaceType>) {
    return this.repository.update(_id, data);
  }
}
