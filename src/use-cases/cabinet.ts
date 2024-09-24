import { cabinetSource } from '@data';
import { CabinetType } from '@domains';
import { uploadCabinetImage } from '@services';
import { Pagination } from '@utils';

export const getCabinetsByWorkspaceId = async (
  workspace: string,
  pagination: Pagination,
  search?: string,
) => {
  return cabinetSource.findAll({ workspace }, pagination, { search });
};

export const createCabinet = async (data: CabinetType, buffer?: Buffer) => {
  let image = undefined;

  const cabinet = await cabinetSource.create({ ...data, image });
  if (buffer) {
    const { location } = await uploadCabinetImage(cabinet._id, buffer);
    image = location;
    await cabinetSource.updateOne(cabinet._id, { image });
    cabinet.image = image;
  }

  return cabinet;
};
