import { RawCabinet } from '../types';
import { BaseEntity } from './Base';

export class Cabinet extends BaseEntity {
  name: string;
  image: string;
  description: string;
  address: string;
  phone: string;
  chairs: string[];
  workspace: string;
  _id: string;

  constructor(data: RawCabinet) {
    super();
    this._id = data._id;
    this.name = data.name;

    this.image = data.image;
    this.description = data.description;
    this.address = data.address;
    this.phone = data.phone;
    this.workspace = data.workspace;
    if (data.chairs) {
      this.chairs = data.chairs;
    }
  }
}
