import { IsString } from 'class-validator';

export class CabinetDto {
  _id?: string;
  @IsString()
  name: string;
  @IsString()
  image: string;
  @IsString()
  description: string;
  @IsString()
  address: string;
  @IsString()
  phone: string;
}
