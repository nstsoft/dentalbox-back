import { InvitationAlreadySent, InvitationExpired, InvitationNotExists } from './constants';

type ErrorType = typeof InvitationAlreadySent | typeof InvitationExpired | typeof InvitationNotExists;

export class InvitationError extends Error {
  public statusCode: number;
  public name: 'Invitation error';
  public type: ErrorType = InvitationNotExists;

  constructor(type: ErrorType, message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.type = type;

    Object.setPrototypeOf(this, InvitationError.prototype);
  }
}
