import bcryptjs from 'bcryptjs';

import { RawUser, UserRole, UserStatus } from '../types';
import { BaseEntity } from './Base';

export class User extends BaseEntity {
  email: string;
  name: string;
  password: string;
  address?: string;
  notes?: string;
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
  dob?: string;
  stripeCustomerId?: string;
  image?: string;

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
    this.dob = data?.dob;
    this.stripeCustomerId = data.stripeCustomerId;
    this.image = data.image;

    if (data.workspaces) {
      this.workspaces = data.workspaces;
      this.roles = data.roles;
    }
  }

  get otpCode() {
    return this.otp;
  }

  comparePassword(password: string): Promise<boolean> {
    return bcryptjs.compare(password, this.password);
  }

  toObject() {
    return { ...this.properties(), password: '******', otp: 0 } as RawUser;
  }

  excludeWorkspaces(currentWorkspace: string): User {
    this.workspaces = this.workspaces.includes(currentWorkspace) ? [currentWorkspace] : [];
    this.roles = [this.roles.find(({ workspace }) => workspace === currentWorkspace)!];
    return this;
  }
}
