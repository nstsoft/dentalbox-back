import { PaymentNotFoundError, StripePaymentError } from './constants';

type ErrorType = typeof PaymentNotFoundError | typeof StripePaymentError;

export class PaymentError extends Error {
  public statusCode: number;
  public details?: string;
  public name: 'Payment error';
  public type: ErrorType = PaymentNotFoundError;

  constructor(
    type: ErrorType = StripePaymentError,
    data: { message?: string; details?: string },
    statusCode = 500,
  ) {
    const { message = '', details = '' } = data;
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.type = type;

    Object.setPrototypeOf(this, PaymentError.prototype);
  }
}
