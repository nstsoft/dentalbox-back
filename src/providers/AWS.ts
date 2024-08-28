import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { config } from '@config';

type BucketName = typeof config.IMAGES_BUCKET;
const awsConfig = { region: config.REGION };

if (config.LAUNCH === 'local') {
  Object.assign(awsConfig, {
    credentials: {
      accessKeyId: config.AWS_ACCESS_KEY_ID,
      secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    },
  });
}

class AwsProvider {
  s3client = new S3Client(awsConfig);
  sesClient = new SESClient(awsConfig);
  snsClient = new SNSClient(awsConfig);

  constructor() {}

  async uploadImageToS3(Bucket: BucketName, Body: Buffer, key: string) {
    const Key = key + '.jpeg';

    const putObjectCommand = new PutObjectCommand({ Bucket, Key, Body, ContentType: 'image/jpeg' });

    await this.s3client.send(putObjectCommand);
    return { location: `https://${Bucket}.s3.amazonaws.com/${Key}`, short: Key };
  }

  async sendSms(PhoneNumber: string, Message: string) {
    try {
      const command = new PublishCommand({ Message, PhoneNumber });
      const response = await this.snsClient.send(command);
      console.log('Message sent! MessageID:', response.MessageId);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  async sendEmail(ToAddresses: string[], data: { subject: string; text?: string; html?: string }) {
    try {
      const command = new SendEmailCommand({
        Source: config.SES_FROM,
        Destination: { ToAddresses },
        Message: {
          Subject: { Data: data.subject },
          Body: { Text: { Data: data.text }, Html: { Data: data.html } },
        },
      });
      const response = await this.sesClient.send(command);
      console.log('Email sent successfully:', response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}

export const awsProvider = new AwsProvider();
