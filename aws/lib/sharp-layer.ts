import { Code, LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import * as path from 'path';

export class SharpLayerConstruct extends Construct {
  layer: LayerVersion;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.layer = new LayerVersion(this, 'MyLayer', {
      code: Code.fromAsset(path.join(__dirname, '../sharp-layer.zip')), // Path to your ZIP file
      compatibleRuntimes: [Runtime.NODEJS_20_X], // Adjust to match your Lambda function runtime
      description: 'A Lambda layer containing Sharp npm package',
    });
  }
}
