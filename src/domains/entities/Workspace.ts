import { RawWorkspace } from '../types';
import { Base } from './Base';

export class Workspace extends Base {
  name: string;
  image: string;
  description: string;
  _id: string;

  constructor({ name, image, description, _id }: RawWorkspace) {
    super();
    this.name = name;
    this.description = description;
    this.image = image;
    this._id = _id;
  }
}
