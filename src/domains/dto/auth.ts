import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

import { UserDto } from './user';
import { WorkspaceDto } from './workspace';

export class RegistrationDto {
  @ValidateNested({ each: true })
  @Type(() => UserDto)
  user: UserDto;
  @ValidateNested({ each: true })
  @Type(() => WorkspaceDto)
  workspace: WorkspaceDto;
  @IsString()
  productId: string;
  @IsOptional()
  workspaceImage?: string;
  @IsString()
  defaultPaymentMethodId: string;
}

export class LoginDto {
  @IsString()
  login: string;
  @IsString()
  password: string;
}
