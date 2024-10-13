import { AuthError, SubscriptionError } from '@errors';
import { userSource } from '@src/data-layer';
import { ActiveSubscriptionStatuses, type SubscriptionStatus, verifyToken } from '@utils';
import { NextFunction, Request, Response } from 'express';
import { Forbidden } from 'http-errors';

export const authenticate =
  (checkVerified = true, checkWorkspace = true) =>
  async (req: Request, _: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const workspace = req.headers.workspace as string;
    let role = null;

    if (!token) return next(new Forbidden('Invalid token'));

    try {
      const verified = verifyToken(token) as {
        _id: string;
        subscriptions: { id: string; status: SubscriptionStatus; workspace: string }[];
      };
      const user = await userSource.findOneOrFail({ _id: verified._id });

      if (!user.workspaces.includes(workspace) && checkWorkspace) {
        return next(new AuthError('Forbidden', { message: 'Forbidden resource' }, 403));
      }

      if (checkWorkspace) {
        role = user.roles.find((role) => role.workspace.toString() === workspace)?.role;
        user.excludeWorkspaces(workspace);
      }

      if (checkVerified && !user.isVerified) {
        return next(new AuthError('Unverified', { message: 'Please verify your account' }, 403));
      }

      Object.assign(req, { user: { ...user.toObject(), otpCode: user.otpCode, role } });
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

export const verifySubscription = () => async (req: Request, _: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const workspace = req.headers.workspace as string;

  if (!token) return next(new Forbidden('Invalid token'));

  try {
    const verified = verifyToken(token) as {
      _id: string;
      subscriptions: { id: string; status: SubscriptionStatus; workspace: string }[];
    };

    const subscription = verified.subscriptions.find((sub) => sub.workspace === workspace);
    if (!subscription || !ActiveSubscriptionStatuses.includes(subscription.status)) {
      return next(
        new SubscriptionError('InactiveSubscription', { message: `Subscription is inactive` }, 403),
      );
    }

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
