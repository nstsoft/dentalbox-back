import { userSource, workspaceSource } from '@data';
import { RegistrationDto } from '@domains';
import { generateToken } from '@utils';
import { Unauthorized } from 'http-errors';

export const login = async (email: string, password: string) => {
  const user = await userSource.findOneOrFail({ email });

  if (!(await user.comparePassword(password))) {
    throw new Unauthorized('Invalid credentials');
  }

  const [authToken, refreshToken] = await Promise.all([
    generateToken({ _id: user._id }),
    generateToken({ _id: user._id }, '10d'),
  ]);

  return { authToken, refreshToken, user: user.toObject() };
};

export const register = async (data: RegistrationDto) => {
  const workspace = await workspaceSource.create({ ...data.workspace, image: '' });

  const user = await userSource.create({ ...data.user, workspace: workspace._id });

  return { workspace, user };
};
