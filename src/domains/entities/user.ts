import bcryptjs from 'bcryptjs';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { RawUser, UserRole } from '../types';
import { Base } from './Base';

export class User extends Base {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  name: string;
  @IsString()
  password: string;
  @IsString()
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
