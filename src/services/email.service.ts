import type { FromSchema } from 'json-schema-to-ts';
import { createTransport, type Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { emailSendResponseSchema } from '../schemas/email.schema';

export default class EmailService {
  private constructor(
    private transporter: Transporter<SMTPTransport.SentMessageInfo>,
  ) {}

  public static async createInstance(
    transportOptions: SMTPTransport.Options,
  ): Promise<EmailService> {
    const transporter =
      createTransport<SMTPTransport.SentMessageInfo>(transportOptions);
    const instance = new EmailService(transporter);
    return instance;
  }

  public async send(
    options: SMTPTransport.MailOptions,
  ): Promise<FromSchema<typeof emailSendResponseSchema>> {
    const response = await this.transporter.sendMail(options);
    const data = {
      messageId: response.messageId,
      accepted: response.accepted.map((value) =>
        typeof value === 'string' ? value : value.address,
      ),
    };
    return data;
  }
}
