import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

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
  plan: string;
}
