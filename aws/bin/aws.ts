#!/usr/bin/env node
import 'source-map-support/register';

import * as cdk from 'aws-cdk-lib';

import { config } from '../../config';
import { AwsStack } from '../lib/stack';

const app = new cdk.App();
new AwsStack(app, `DentalBox-${config.NODE_ENV}`, { env: { region: config.REGION, account: config.ACCOUNT } });
