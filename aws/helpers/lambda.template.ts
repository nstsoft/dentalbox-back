import { Duration } from 'aws-cdk-lib';
import { FunctionOptions, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

import { config } from '../../config';

type Props = {
  name: string;
  functionName: string;
  entry: string;
  handler: string;
} & FunctionOptions;

export const LambdaConstruct = (scope: Construct, id: string, props: Partial<Props>) =>
  new NodejsFunction(scope, id, {
    timeout: Duration.minutes(15),
    memorySize: 300,
    retryAttempts: 0,
    runtime: Runtime.NODEJS_20_X,
    environment: {
      DATABASE_URL: config.DATABASE_URL,
      DATABASE_PASSWORD: config.DATABASE_PASSWORD,
      DATABASE_USER: config.DATABASE_USER,
      DATABASE: config.DATABASE,
      SECRET_KEY: config.SECRET_KEY,
      BCRYPT_SALT: config.BCRYPT_SALT + '',
      REGION: config.REGION,
      ACCOUNT: config.ACCOUNT,
      NODE_ENV: config.NODE_ENV,
    },
    ...props,
  });
