import { RawChair } from '../types';
import { BaseEntity } from './Base';

export class Chair extends BaseEntity {
  name: string;
  notes: string;
  cabinet: string;
  workspace: string;
  _id: string;

  constructor(data: RawChair) {
    super();
    this._id = data._id;
    this.name = data.name;
    this.notes = data.notes;
    this.cabinet = data.cabinet;
    this.workspace = data.workspace;
  }
}
