import { PutObjectCommand, S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { config } from '@config';

type BucketName = typeof config.IMAGES_BUCKET;
const s3config: S3ClientConfig = { region: config.REGION };

if (config.LAUNCH === 'local') {
  Object.assign(s3config, {
    credentials: {
      accessKeyId: config.AWS_ACCESS_KEY_ID_LOCAL,
      secretAccessKey: config.AWS_SECRET_ACCESS_KEY_LOCAL,
    },
  });
}

class AwsProvider {
  s3client = new S3Client(s3config);

  constructor() {}

  async uploadImageToS3(Bucket: BucketName, Body: Buffer, key: string) {
    const Key = key + '.jpeg';

    const putObjectCommand = new PutObjectCommand({ Bucket, Key, Body, ContentType: 'image/jpeg' });

    await this.s3client.send(putObjectCommand);
    return { location: `https://${Bucket}.s3.amazonaws.com/${Key}`, short: Key };
  }
}

export const awsProvider = new AwsProvider();
