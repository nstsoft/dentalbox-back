import { config } from '@config';
import { awsProvider } from '@providers';
import sharp from 'sharp';

export const uploadWorkspaceImage = async (workspace: string, body: Buffer) => {
  const image = await sharp(body)
    .resize(300, 300, { fit: 'cover' })
    .toFormat('jpeg', { quality: 40 })
    .toBuffer();
  return awsProvider.uploadImageToS3(config.IMAGES_BUCKET, image, `workspaces/${workspace}`);
};

export const uploadCabinetImage = async (cabinet: string, body: Buffer) => {
  const image = await sharp(body)
    .resize(300, 300, { fit: 'cover' })
    .toFormat('jpeg', { quality: 40 })
    .toBuffer();

  return awsProvider.uploadImageToS3(config.IMAGES_BUCKET, image, `cabinets/${cabinet}`);
};
