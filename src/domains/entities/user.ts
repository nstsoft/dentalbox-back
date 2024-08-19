import bcryptjs from 'bcryptjs';

import { RawUser, UserRole } from '../types';
import { Base } from './Base';

export class User extends Base {
  email: string;
  name: string;
  password: string;
  role: UserRole;
  _id?: string;

  constructor({ email, password, role, _id, name }: RawUser) {
    super();
    this.email = email;
    this.password = password;
    this.role = role;
    this._id = _id;
    this.name = name;
  }

  comparePassword(password: string): Promise<boolean> {
    return bcryptjs.compare(password, this.password);
  }

  toJson() {
    return JSON.stringify({
      email: this.email,
      name: this.name,
      password: '*****',
      role: this.role,
      _id: this._id,
    });
  }
}
