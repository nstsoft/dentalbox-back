import 'reflect-metadata';

import serverlessExpress from '@codegenie/serverless-express';
import { MongoSource } from '@data';
import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';

import { app } from '../server';

let serverlessExpressInstance: Handler;

async function setup(event: APIGatewayEvent, context: Context, callback: Callback) {
  await MongoSource.initialize();
  serverlessExpressInstance = serverlessExpress({ app });
  return serverlessExpressInstance(event, context, callback);
}

export const handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);
  context.callbackWaitsForEmptyEventLoop = true;
  if (serverlessExpressInstance) return serverlessExpressInstance(event, context, callback);

  return setup(event, context, callback);
};
