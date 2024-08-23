import { RemovalPolicy } from 'aws-cdk-lib';
import { BlockPublicAccess, Bucket, IBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

import { config } from '../../config';

export class S3ImagesBucketConstruct extends Construct {
  imagesBucket: IBucket;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    try {
      this.imagesBucket = Bucket.fromBucketName(this, 'ImportedBucket', config.IMAGES_BUCKET);
    } catch (_err) {
      this.imagesBucket = new Bucket(this, 'NewBucket', {
        removalPolicy: config.NODE_ENV === 'production' ? RemovalPolicy.DESTROY : RemovalPolicy.RETAIN,
        autoDeleteObjects: config.NODE_ENV === 'production',
        publicReadAccess: true,
        blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
        bucketName: config.IMAGES_BUCKET,
      });
    }
  }
}
