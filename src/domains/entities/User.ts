import bcryptjs from 'bcryptjs';

import { RawUser, UserRole } from '../types';
import { Base } from './Base';

export class User extends Base {
  email: string;
  name: string;
  password: string;
  address?: string | undefined;
  notes?: string | undefined;
  _id: string;
  workspaces: string[] = [];
  roles: { workspace: string; role: UserRole }[] = [];

  constructor(data: RawUser) {
    const { email, password, roles, _id, name, address, notes, workspaces } = data;

    super();
    this.email = email;
    this.password = password;

    this._id = _id;
    this.name = name;
    this.address = address;
    this.notes = notes;

    this.workspaces = workspaces;
    this.roles = roles;
  }

  comparePassword(password: string): Promise<boolean> {
    return bcryptjs.compare(password, this.password);
  }

  toObject() {
    return { ...this.properties(), password: '******' } as RawUser;
  }
}
