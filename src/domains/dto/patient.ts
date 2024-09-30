import { phoneNumberRegex } from '@utils';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class PatientDto {
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
  surname: string;
  @IsString()
  secondName: string;
  @IsString()
  dob: string;
  @IsString()
  @IsOptional()
  image?: string;
  @IsString()
  @IsOptional()
  notes?: string;
}
