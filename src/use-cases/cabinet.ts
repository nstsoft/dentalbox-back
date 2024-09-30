import { cabinetSource, chairSource } from '@data';
import { CabinetType } from '@domains';
import { uploadCabinetImage } from '@services';
import { Pagination } from '@utils';

export const getCabinetsByWorkspaceId = async (
  workspace: string,
  pagination: Pagination,
  search?: string,
) => {
  const cabinets = await cabinetSource.findAll({ workspace }, pagination, { search });

  const chairs = await chairSource.findAll({
    cabinet: { $in: cabinets.data.map((cabinet) => cabinet._id) },
  });

  return {
    count: cabinets.count,
    data: cabinets.data.map((cabinet) => ({
      ...cabinet,
      chairs: chairs.data.filter((chair) => chair.cabinet === cabinet._id),
    })),
  };
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
