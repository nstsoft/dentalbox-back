import { userSource } from '@src/data-layer';
import { verifyToken } from '@utils';
import { NextFunction, Request, Response } from 'express';
import { Forbidden } from 'http-errors';

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return next(new Forbidden('Invalid token'));

  try {
    const verified = verifyToken(token) as { _id: string };
    const user = await userSource.findOneOrFail({ _id: verified._id });

    Object.assign(req, { user: user.toObject() });

    return next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log(err);
    return next(new Forbidden(err.name ?? 'Invalid token'));
  }
};
