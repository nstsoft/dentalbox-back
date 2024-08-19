import { BaseEntity } from '@utils';

export enum UserRole {
  admin = 'admin',
  manager = 'manager',
  doctor = 'doctor',
  assistant = 'assistant',
}

export type UserType = {
  name: string;
  // surname: string;
  // secondName: string;
  email: string;
  // phone: string;
  address?: string;
  notes?: string;
  // createdAt?: Date;
  // updatedAt?: Date;
  role: UserRole;
  password: string;
};

export type RawUser = UserType & {
  _id?: string;
};

export type UserEntity = BaseEntity<RawUser> & {
  comparePassword(password: string): Promise<boolean>;
};
