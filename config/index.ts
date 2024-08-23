import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname + '/../.env') });

type Config = {
  DATABASE_URL: string;
  DATABASE_PASSWORD: string;
  DATABASE_USER: string;
  DATABASE: string;
  BCRYPT_SALT: number;
  PORT: number;
  SECRET_KEY: string;
  REGION: string;
  ACCOUNT: string;
  NODE_ENV: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_REDIRECT_URI: string;
  AUTH_REDIRECT_URL: string;
  IMAGES_BUCKET: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  LAUNCH: string;
};

export const config: Config = {
  DATABASE_URL: process.env.DATABASE_URL ?? '',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD ?? '',
  DATABASE_USER: process.env.DATABASE_USER ?? '',
  DATABASE: process.env.DATABASE ?? 'dentalbox-development',
  SECRET_KEY: process.env.SECRET_KEY ?? '',
  BCRYPT_SALT: +(process.env.BCRYPT_SALT ?? 10),
  PORT: +(process.env.PORT ?? 3001),
  REGION: process.env.REGION ?? '',
  ACCOUNT: process.env.ACCOUNT ?? '',
  NODE_ENV: process.env.NODE_ENV ?? '',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? '',
  GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI ?? '',
  AUTH_REDIRECT_URL: process.env.AUTH_REDIRECT_URL ?? '',
  IMAGES_BUCKET: process.env.IMAGES_BUCKET ?? '',
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ?? '',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ?? '',
  LAUNCH: process.env.LAUNCH ?? '',
};
