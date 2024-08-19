import { userSource } from '@src/data-layer';
import { UserDto } from '@domains';
import { generateToken } from '@utils';
import { Unauthorized } from 'http-errors';

export const createUser = (data: UserDto) => {
  return userSource.create(data);
};

export const login = async (email: string, pasword: string) => {
  const user = await userSource.findOneOrFail({ email });

  if (!(await user.comparePassword(pasword))) {
    throw new Unauthorized('Invalid credentials');
  }

  const [authToken, refreshToken] = await Promise.all([
    generateToken({ _id: user._id }),
    generateToken({ _id: user._id }, '10d'),
  ]);

  return { authToken, refreshToken, user: user.toObject() };
};
