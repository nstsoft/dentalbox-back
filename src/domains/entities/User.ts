import bcryptjs from 'bcryptjs';

import { RawUser, UserRole, UserStatus } from '../types';
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
  surname: string;
  secondName: string;
  phone?: string;
  enableNotifications: boolean = true;
  otp: number;
  isVerified: boolean = false;
  status: UserStatus;

  constructor(data: RawUser) {
    super();
    this._id = data._id;
    this.email = data.email;
    this.password = data.password;
    this.name = data.name;
    this.address = data.address;
    this.notes = data.notes;
    this.surname = data.surname;
    this.secondName = data.secondName;
    this.phone = data.phone;
    this.otp = data?.otp;
    this.isVerified = data?.isVerified;
    this.status = data?.status;

    if (data.workspaces) {
      this.workspaces = data.workspaces;
      this.roles = data.roles;
    }
  }

  comparePassword(password: string): Promise<boolean> {
    return bcryptjs.compare(password, this.password);
  }

  toObject() {
    return { ...this.properties(), password: '******', otp: 0 } as RawUser;
  }

  excludeWorkspaces(currentWorkspace: string) {
    console.log(this.workspaces, currentWorkspace);
    this.workspaces = this.workspaces.includes(currentWorkspace) ? [currentWorkspace] : [];
  }
}
