import { RemovalPolicy } from 'aws-cdk-lib';
import { BlockPublicAccess, Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

import { config } from '../../config';

export class S3ImagesBucketConstruct extends Construct {
  imagesBucket: Bucket;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.imagesBucket = new Bucket(this, 'MyImageBucket', {
      removalPolicy: config.NODE_ENV === 'production' ? RemovalPolicy.DESTROY : RemovalPolicy.RETAIN,
      autoDeleteObjects: config.NODE_ENV === 'production',
      publicReadAccess: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
      bucketName: config.IMAGES_BUCKET,
    });
  }
}
