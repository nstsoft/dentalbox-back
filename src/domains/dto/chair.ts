import { IsOptional, IsString } from 'class-validator';

export class ChairDto {
  _id?: string;
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  notes: string;
  @IsString()
  cabinet: string;
}
