import { RawPatient } from '../types';
import { BaseEntity } from './Base';

export class Patient extends BaseEntity {
  email: string;
  name: string;
  address?: string;
  notes?: string;
  _id: string;
  surname: string;
  secondName: string;
  phone: string;
  image?: string;
  dob: string;
  workspace: string;

  constructor(data: RawPatient) {
    super();
    this._id = data._id;
    this.email = data.email;
    this.name = data.name;
    this.address = data.address;
    this.notes = data.notes;
    this.surname = data.surname;
    this.secondName = data.secondName;
    this.phone = data.phone;
    this.dob = data?.dob;
    this.image = data.image;
    this.workspace = data.workspace;
  }
}
