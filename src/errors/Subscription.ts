import {
  StripeSubscriptionNotFound,
  SubscriptionError500,
  SubscriptionNotFound,
} from './constants';

type ErrorType =
  | typeof StripeSubscriptionNotFound
  | typeof SubscriptionNotFound
  | typeof SubscriptionError500;

export class SubscriptionError extends Error {
  public statusCode: number;
  public details?: string;
  public name: 'Subscription error';
  public type: ErrorType = SubscriptionError500;

  constructor(
    type: ErrorType = SubscriptionError500,
    data: { message?: string; details?: string },
    statusCode = 500,
  ) {
    const { message = '', details = '' } = data;
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.type = type;

    Object.setPrototypeOf(this, SubscriptionError.prototype);
  }
}
