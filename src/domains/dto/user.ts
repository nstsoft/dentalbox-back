import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { UserRole, UserStatus } from '../types';

export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  phone: string;
  @IsString()
  @IsOptional()
  address: string;
  @IsString()
  password: string;
  @IsString()
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
  phone?: string;
  @IsString()
  invitation: string;
}
