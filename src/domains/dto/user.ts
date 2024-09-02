import { phoneNumberRegex } from '@utils';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

import { UserRole, UserStatus } from '../types';

export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  @Matches(phoneNumberRegex, { message: 'Phone number must be in E.164 format' })
  phone: string;
  @IsString()
  @IsOptional()
  address: string;
  @IsString()
  password: string;
  @IsString()
  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;
  _id?: string;
  @IsString()
  surname: string;
  @IsString()
  secondName: string;
  @IsString()
  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus;
}
export class InviteUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsEnum(UserRole)
  role: UserRole;
}

export class AcceptInvitationDto {
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsOptional()
  surname?: string;
  @IsString()
  @IsOptional()
  secondName?: string;
  @IsString()
  @IsOptional()
  address?: string;
  @IsString()
  @IsOptional()
  password?: string;
  @IsString()
  @IsOptional()
  @Matches(phoneNumberRegex, { message: 'Phone number must be in E.164 format' })
  phone?: string;
  @IsString()
  token: string;
}
