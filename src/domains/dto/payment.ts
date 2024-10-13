import { IsString } from 'class-validator';

export class SetPaymentMethod {
  @IsString()
  payment: string;
}
