import { Duration } from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import * as path from 'path';

import { LambdaConstruct } from '../../helpers';

export class ApiConstruct extends Construct {
  handler: NodejsFunction;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.handler = LambdaConstruct(this, 'DentalBox', {
      functionName: `dental-box`,
      entry: path.join(__dirname, '../../../src/handler.ts'),
      handler: 'handler',
      timeout: Duration.seconds(20),
      memorySize: 300,
    });
  }
}
