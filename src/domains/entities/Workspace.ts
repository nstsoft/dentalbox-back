import { RawWorkspace } from '../types';
import { Base } from './Base';

export class Workspace extends Base {
  name: string;
  image?: string;
  description: string;
  maxMembersCount: number;
  currentMembersCount: number;
  _id: string;

  constructor({ name, image, description, _id, maxMembersCount, currentMembersCount }: RawWorkspace) {
    super();
    this.name = name;
    this.description = description;
    this.image = image;
    this.maxMembersCount = maxMembersCount;
    this.currentMembersCount = currentMembersCount;
    this._id = _id;
  }
}
