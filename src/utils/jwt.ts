import { config } from '@config';
import jwt from 'jsonwebtoken';

export function generateToken(payload: object, expires?: string | number): string {
  return jwt.sign(payload, config.SECRET_KEY, { expiresIn: expires ?? '1h' });
}

export function verifyToken(token: string): object | string {
  return jwt.verify(token, config.SECRET_KEY);
}
