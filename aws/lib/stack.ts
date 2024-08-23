import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { S3ImagesBucketConstruct } from './bucket';
import { ApiGateway } from './gateway';
import { ApiConstruct } from './lambdas';
import { SharpLayerConstruct } from './sharp-layer';

export class AwsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const { layer } = new SharpLayerConstruct(this, 'sharp-layer');
    const { imagesBucket } = new S3ImagesBucketConstruct(this, 'images-bucket');
    const { handler } = new ApiConstruct(this, 'dentalbox-api', [layer]);

    imagesBucket.grantWrite(handler);
    imagesBucket.grantPut(handler);
    imagesBucket.grantRead(handler);

    new ApiGateway(this, 'Gateway', handler);
  }
}
