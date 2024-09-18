import { IsOptional, IsString } from 'class-validator';

export class CreateCabinetDto {
  _id?: string;
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  notes: string;
  @IsString()
  @IsOptional()
  address: string;
  @IsString()
  @IsOptional()
  phone: string;
}
