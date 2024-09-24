import { IsString } from 'class-validator';

export class SetDefaultPaymentMethod {
  @IsString()
  payment: string;
}
