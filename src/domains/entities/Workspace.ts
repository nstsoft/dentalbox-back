import { RawWorkspace } from '../types';
import { BaseEntity } from './Base';

export class Workspace extends BaseEntity {
  name: string;
  image?: string;
  notes?: string;
  maxMembersCount: number;
  currentMembersCount: number;
  _id: string;

  constructor({ name, image, notes, _id, maxMembersCount, currentMembersCount }: RawWorkspace) {
    super();
    this.name = name;
    this.notes = notes;
    this.image = image;
    this.maxMembersCount = maxMembersCount;
    this.currentMembersCount = currentMembersCount;
    this._id = _id;
  }

  canAcceptUser() {
    return this.currentMembersCount < this.maxMembersCount;
  }
}
