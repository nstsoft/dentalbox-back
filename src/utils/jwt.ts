import { config } from '@config';
import jwt from 'jsonwebtoken';

export function generateToken(payload: object, expires?: string | number): string {
  return jwt.sign(payload, config.SECRET_KEY, { expiresIn: expires ?? '1h' });
}

export function verifyToken(token: string): object | string {
  return jwt.verify(token, config.SECRET_KEY);
}

export const getAuthTokens = async (_id: string) => {
  const [authToken, refreshToken] = await Promise.all([generateToken({ _id }), generateToken({ _id }, '10d')]);

  return { authToken, refreshToken };
};

export const refreshAuthToken = async (authToken: string, refreshToken: string) => {
  try {
    jwt.verify(authToken, config.SECRET_KEY) as { _id: string };
    return { authToken, refreshToken };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e.name === 'TokenExpiredError') {
      const rToken = jwt.verify(refreshToken, config.SECRET_KEY) as { _id: string };
      return getAuthTokens(rToken._id);
    }
    return Promise.reject(e);
  }
};
