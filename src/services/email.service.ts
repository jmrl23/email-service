import { createTransport, type Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export default class EmailService {
  private constructor(
    private readonly transporter: Transporter<SMTPTransport.SentMessageInfo>,
  ) {}

  public static async createInstance(
    transportOptions: SMTPTransport.Options,
  ): Promise<EmailService> {
    const transporter =
      createTransport<SMTPTransport.SentMessageInfo>(transportOptions);
    const instance = new EmailService(transporter);
    return instance;
  }

  async send(
    options: SMTPTransport.MailOptions,
  ): Promise<SMTPTransport.SentMessageInfo> {
    const data = await this.transporter.sendMail(options);
    return data;
  }
}
