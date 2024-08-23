import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { ApiGateway } from './gateway';
import { ApiConstruct } from './lambdas';
import { SharpLayerConstruct } from './sharp-layer';

export class AwsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const { layer } = new SharpLayerConstruct(this, 'sharp-layer');

    const { handler } = new ApiConstruct(this, 'dentalbox-api', [layer]);

    new ApiGateway(this, 'Gateway', handler);
  }
}
