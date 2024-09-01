import { Expired, Forbidden, TokenNotProvided, Unauthorized, Unverified } from './constants';

type ErrorType = typeof Unauthorized | typeof Unverified | typeof Forbidden | typeof Expired | typeof TokenNotProvided;

export class AuthError extends Error {
  public statusCode: number;
  public details?: string;
  public name: 'Authentication error';
  public type: ErrorType = Unauthorized;

  constructor(
    type: ErrorType,
    { message = '', details = '' }: { message?: string; details?: string },
    statusCode = 401,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.type = type;

    Object.setPrototypeOf(this, AuthError.prototype);
  }
}
