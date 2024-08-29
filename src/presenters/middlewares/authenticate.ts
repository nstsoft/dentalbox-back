import { AuthError } from '@errors';
import { userSource } from '@src/data-layer';
import { verifyToken } from '@utils';
import { NextFunction, Request, Response } from 'express';
import { Forbidden } from 'http-errors';

const authenticateToken = async (req: Request, res: Response, next: NextFunction, checkVerified = true) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const workspace = req.headers.workspace as string;

  if (!token) return next(new Forbidden('Invalid token'));

  try {
    const verified = verifyToken(token) as { _id: string };
    const user = await userSource.findOneOrFail({ _id: verified._id });

    if (!user.workspaces.includes(workspace)) {
      return next(new AuthError('Forbidden', { message: 'Forbidden resource' }, 403));
    }

    user.excludeWorkspaces(workspace);

    if (checkVerified && !user.isVerified) {
      return next(new AuthError('Unverified', { message: 'Please verify your account' }, 403));
    }

    Object.assign(req, { user: user.toObject() });
    Object.assign(req, { workspace });

    return next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      return next(new AuthError('Expired', { message: 'Invalid token' }, 403));
    }
    return next(err);
  }
};

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  return authenticateToken(req, res, next);
};

export const authenticateUnverified = (req: Request, res: Response, next: NextFunction) => {
  return authenticateToken(req, res, next, false);
};
