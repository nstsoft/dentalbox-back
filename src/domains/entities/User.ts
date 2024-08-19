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
  @IsString()
  address?: string | undefined;
  @IsString()
  notes?: string | undefined;
  _id?: string;

  constructor({ email, password, role, _id, name, address, notes }: RawUser) {
    super();
    this.email = email;
    this.password = password;
    this.role = role;
    this._id = _id;
    this.name = name;
    this.address = address;
    this.notes = notes;
  }

  comparePassword(password: string): Promise<boolean> {
    return bcryptjs.compare(password, this.password);
  }

  toObject() {
    return { ...this.properties(), password: '******' } as RawUser;
  }
}
