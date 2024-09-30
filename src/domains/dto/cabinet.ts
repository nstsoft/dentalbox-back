import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';

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
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  chairs: string[];
}
