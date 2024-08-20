import { IsString } from 'class-validator';

export class WorkspaceDto {
  _id?: string;
  @IsString()
  name: string;
  // @IsString()
  // image: string;
  @IsString()
  description: string;
}
