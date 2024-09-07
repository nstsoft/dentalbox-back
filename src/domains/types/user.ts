import { BaseEntity } from '@utils';

export enum UserRole {
  admin = 'admin',
  manager = 'manager',
  doctor = 'doctor',
  assistant = 'assistant',
}

export enum UserStatus {
  active = 'active',
  pending = 'pending',
}

export type UserType = {
  name: string;
  surname: string;
  secondName: string;
  email: string;
  phone?: string;
  address?: string;
  notes?: string;
  roles: { workspace: string; role: UserRole }[];
  password: string;
  workspaces: string[];
  isVerified: boolean;
  enableNotifications: boolean;
  otp: number;
  status: UserStatus;
  stripeCustomerId?: string;
  dob?: string;
  image?: string;
};

export type RawUser = UserType & { _id: string };

export type UserEntity = BaseEntity<RawUser> & {
  comparePassword(password: string): Promise<boolean>;
  excludeWorkspaces(currentWorkspace: string): void;
  get otpCode(): number;
};
