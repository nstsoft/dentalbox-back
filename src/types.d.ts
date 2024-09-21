/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@domains';
import { Request as ExpressRequest } from 'express';

declare global {
  namespace Express {
    // interface Request extends ExpressRequest {}
    interface AuthenticatedRequest<
      P = core.ParamsDictionary,
      ResBody = any,
      ReqBody = any,
      ReqQuery = core.Query,
      Locals extends Record<string, any> = Record<string, any>,
    > extends ExpressRequest<
        P,
        ResBody,
        ReqBody,
        ReqQuery & { skip: number; limit: number },
        Locals
      > {
      user: User & { _id: string; workspaces: string[]; otpCode: number };
      workspace: string;
      pagination: { skip: number; limit: number };
      filter: { search };
    }
  }
}
