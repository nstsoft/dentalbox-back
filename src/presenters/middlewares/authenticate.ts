import { AuthError } from '@errors';
import { userSource } from '@src/data-layer';
import { verifyToken } from '@utils';
import { NextFunction, Request, Response } from 'express';
import { Forbidden } from 'http-errors';

export const authenticate =
  (checkVerified = true, checkWorkspace = true) =>
  async (req: Request, _: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const workspace = req.headers.workspace as string;

    if (!token) return next(new Forbidden('Invalid token'));

    try {
      const verified = verifyToken(token) as { _id: string };
      const user = await userSource.findOneOrFail({ _id: verified._id });

      if (!user.workspaces.includes(workspace) && checkWorkspace) {
        return next(new AuthError('Forbidden', { message: 'Forbidden resource' }, 403));
      }
      if (checkWorkspace) {
        user.excludeWorkspaces(workspace);
      }

      if (checkVerified && !user.isVerified) {
        return next(new AuthError('Unverified', { message: 'Please verify your account' }, 403));
      }

      Object.assign(req, { user: { ...user.toObject(), otpCode: user.otpCode } });
      Object.assign(req, { workspace });

      return next();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      if (err.name === 'TokenExpiredError') {
        return next(new AuthError('Expired', { message: 'Invalid token' }, 403));
      }
      return next(err);
    }
  };
