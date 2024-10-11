import { config } from '@config';
import { SubscriptionStatus } from '@utils';
import jwt from 'jsonwebtoken';

export function generateToken(payload: object, expires?: string | number): string {
  return jwt.sign(payload, config.SECRET_KEY, { expiresIn: expires ?? '1h' });
}

export function verifyToken(token: string): object | string {
  return jwt.verify(token, config.SECRET_KEY);
}

export const getAuthTokens = async (
  _id: string,
  subscriptions: { id: string; status: SubscriptionStatus; workspace: string }[],
) => {
  const [authToken, refreshToken] = await Promise.all([
    generateToken({ _id, subscriptions }),
    generateToken({ _id }, '10d'),
  ]);

  return { authToken, refreshToken };
};

export const refreshAuthToken = async (
  authToken: string,
  refreshToken: string,
  subscriptions: { id: string; status: SubscriptionStatus; workspace: string }[],
) => {
  try {
    jwt.verify(authToken, config.SECRET_KEY) as { _id: string };
    return { authToken, refreshToken };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e.name === 'TokenExpiredError') {
      const rToken = jwt.verify(refreshToken, config.SECRET_KEY) as { _id: string };
      return getAuthTokens(rToken._id, subscriptions);
    }
    return Promise.reject(e);
  }
};

export const extractIdFromTokens = async (authToken: string, refreshToken: string) => {
  try {
    const verifiedToken = jwt.verify(authToken, config.SECRET_KEY) as { _id: string };
    return verifiedToken._id;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e.name === 'TokenExpiredError') {
      const rToken = jwt.verify(refreshToken, config.SECRET_KEY) as { _id: string };
      return rToken._id;
    }
    return Promise.reject(e);
  }
};
