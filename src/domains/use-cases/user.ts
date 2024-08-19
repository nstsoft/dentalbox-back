import { userSource } from '@data';
import { UserDto } from '@domains';

export const createUser = (data: UserDto) => {
  return userSource.create(data);
};
