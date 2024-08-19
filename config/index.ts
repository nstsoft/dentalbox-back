import 'dotenv/config';

type Config = {
  DATABASE_URL: string;
  DATABASE_PASSWORD: string;
  DATABASE_USER: string;
  DATABASE: string;
  BCRYPT_SALT: string;
};

export const config: Config = {
  DATABASE_URL: process.env.DATABASE_URL ?? '',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD ?? '',
  DATABASE_USER: process.env.DATABASE_USER ?? '',
  DATABASE: process.env.DATABASE ?? 'dentalbox-development',
  BCRYPT_SALT: process.env.BCRYPT_SALT ?? '',
};
