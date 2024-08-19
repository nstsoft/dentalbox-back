import 'dotenv/config';

type Config = {
  DATABASE_URL: string;
  DATABASE_PASSWORD: string;
  DATABASE_USER: string;
  DATABASE: string;
  BCRYPT_SALT: number;
  PORT: number;
  SECRET_KEY: string;
};

export const config: Config = {
  DATABASE_URL: process.env.DATABASE_URL ?? '',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD ?? '',
  DATABASE_USER: process.env.DATABASE_USER ?? '',
  DATABASE: process.env.DATABASE ?? 'dentalbox-development',
  SECRET_KEY: process.env.SECRET_KEY ?? '',
  BCRYPT_SALT: +(process.env.BCRYPT_SALT ?? 10),
  PORT: +(process.env.PORT ?? 3001),
};
