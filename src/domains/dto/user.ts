import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { UserRole, UserStatus } from '../types';

export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  name: string;
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
