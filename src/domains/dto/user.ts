import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { UserRole } from '../types';

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
}
