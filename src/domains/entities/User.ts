import bcryptjs from 'bcryptjs';

import { RawUser, UserRole } from '../types';
import { Base } from './Base';

export class User extends Base {
  email: string;
  name: string;
  password: string;
  role: UserRole;
  address?: string | undefined;
  notes?: string | undefined;
  _id?: string;
  workspace?: string;

  constructor(data: RawUser) {
    const { email, password, role, _id, name, address, notes, workspace } = data;

    super();
    this.email = email;
    this.password = password;
    this.role = role;
    this._id = _id;
    this.name = name;
    this.address = address;
    this.notes = notes;
    this.workspace = workspace;
  }

  comparePassword(password: string): Promise<boolean> {
    return bcryptjs.compare(password, this.password);
  }

  toObject() {
    return { ...this.properties(), password: '******' } as RawUser;
  }
}
