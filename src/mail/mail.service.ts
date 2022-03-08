import { Injectable } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';
import { Email } from 'src/emails/models/email.interface';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_API'));
  }

  getEmail(data: Email) {
    return {
      to: data.email,
      from: this.configService.get<string>('SEND_GRID_SENDER'),
      subject: data.subject,
      templateId: data.template,
      dynamic_template_data: data
    };
  }

  async sendEmail(data: Email): Promise<any> {
    try {
      const emailTemplate = this.getEmail(data);

      return await SendGrid.send(emailTemplate);
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }
}
