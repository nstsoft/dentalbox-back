import { UserDto } from '@domains';
import { userSource } from '@src/data-layer';

export const createUser = (data: UserDto) => {
  return userSource.create({ ...data, roles: [], workspaces: [] });
};
