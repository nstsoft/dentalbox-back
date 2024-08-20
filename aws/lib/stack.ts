import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { ApiGateway } from './gateway';
import { ApiConstruct } from './lambdas';

export class AwsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const { handler } = new ApiConstruct(this, 'dentalbox-api');

    new ApiGateway(this, 'Gateway', handler);
  }
}
