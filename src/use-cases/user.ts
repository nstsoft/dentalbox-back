import { UserDto } from '@domains';
import { userSource } from '@src/data-layer';
import { generateOTP } from '@utils';

export const createUser = (data: UserDto) => {
  return userSource.create({
    ...data,
    roles: [],
    workspaces: [],
    isVerified: false,
    enableNotifications: true,
    otp: generateOTP(),
  });
};

export const confirmOtp = (_id: string) => {
  return userSource.updateOne(_id, { isVerified: true });
};
