import { ChairType, RawCabinet } from '../types';
import { BaseEntity } from './Base';

export class Cabinet extends BaseEntity {
  name: string;
  image?: string;
  notes?: string;
  address?: string;
  phone?: string;
  workspace: string;
  chairs: ChairType[];
  _id: string;

  constructor(data: RawCabinet) {
    super();
    this._id = data._id;
    this.name = data.name;
    this.image = data.image;
    this.notes = data.notes;
    this.address = data.address;
    this.phone = data.phone;
    this.workspace = data.workspace;
  }

  setChairs(chairs: ChairType[]) {
    this.chairs = chairs;
  }
}
