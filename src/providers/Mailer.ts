import { config } from 'config';
import nodemailer, { type Transporter } from 'nodemailer';

// console.log({
//   type: 'OAuth2',
//   // user: config.NODEMAILER_FROM,
//   user: 'dentalbox@dentalbox.iam.gserviceaccount.com',
//   serviceClient: config.GOOGLE_SERVICE_ACCOUNT_CLIENT_ID,
//   privateKey: config.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
// });

class NodeMailerProvider {
  transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAUTH2',
        user: 'dentalbox@dentalbox.iam.gserviceaccount.com',
        serviceClient: config.GOOGLE_SERVICE_ACCOUNT_CLIENT_ID,
        privateKey: config.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
      },
    });
    this.transporter.on('token', (token) => console.log(token));
  }

  async sendEmail(to: string, data: { subject: string; text?: string; html?: string }) {
    console.log(to, data);
    try {
      const response = await this.transporter.sendMail({
        to,
        from: config.NODEMAILER_FROM,
        subject: data.subject,
        text: data.text,
        html: data.html,
      });
      console.log('Email sent successfully:', response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}

export const nodeMailerProvider = new NodeMailerProvider();
