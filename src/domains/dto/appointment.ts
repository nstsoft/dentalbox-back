import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class AppointmentListQueryDto {
  @IsDateString()
  start: string;
  @IsDateString()
  end: string;
  @ValidateIf((obj) => typeof obj.value === 'string')
  @IsString()
  @IsOptional()
  @ValidateIf((obj) => Array.isArray(obj.value))
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  patient?: string | string[];
  @ValidateIf((obj) => typeof obj.value === 'string')
  @IsString()
  @IsOptional()
  @ValidateIf((obj) => Array.isArray(obj.value))
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  cabinet?: string | string[];
  @ValidateIf((obj) => typeof obj.value === 'string')
  @IsString()
  @IsOptional()
  @ValidateIf((obj) => Array.isArray(obj.value))
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  doctor?: string | string[];
}
export class CreateAppointmentDto {
  @IsDateString()
  start: string;
  @IsDateString()
  end: string;
  @IsString()
  patient: string;
  @IsString()
  cabinet: string;
  @IsString()
  doctor: string;
  @IsString()
  @IsOptional()
  chair: string;
  @IsString()
  @IsOptional()
  notes?: string;
}
