import { Duration } from 'aws-cdk-lib';
import { FunctionOptions, ILayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join } from 'path';

import { config } from '../../config';

type Props = {
  name: string;
  functionName: string;
  entry: string;
  handler: string;
  layers?: ILayerVersion[];
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
      IMAGES_BUCKET: config.IMAGES_BUCKET,
      GOOGLE_CLIENT_ID: config.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: config.GOOGLE_CLIENT_SECRET,
      GOOGLE_REDIRECT_URI: config.GOOGLE_REDIRECT_URI,
      AUTH_REDIRECT_URL: config.AUTH_REDIRECT_URL,
    },
    ...props,
    entry: join(__dirname, `../../lambdas/${props.entry}.js`),
    handler: 'handler',
  });
