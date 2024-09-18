import { WorkspaceFullError } from './constants';

type ErrorType = typeof WorkspaceFullError;

export class WorkspaceError extends Error {
  public statusCode: number;
  public details?: string;
  public name: 'Subscription error';
  public type: ErrorType = WorkspaceFullError;

  constructor(
    type: ErrorType = WorkspaceFullError,
    data: { message?: string; details?: string },
    statusCode = 500,
  ) {
    const { message = '', details = '' } = data;
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.type = type;

    Object.setPrototypeOf(this, WorkspaceError.prototype);
  }
}
