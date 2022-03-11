import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EmailsService } from './emails.service';
import EmailsEnum from './enums/emails.enums';
import { Email } from './models/email.interface';
import EmailInput from './models/email_input.interface';

@Controller('emails')
export class EmailsController {
  constructor(
    private readonly emailService: EmailsService,
    @Inject('TEST_SERVICE')
    private readonly client: ClientProxy
  ) {}

  @EventPattern('save_email')
  async saveEventData(input: EmailInput) {
    try {

      const email: Email = {
        ...input,
        template: JSON.stringify(input?.templateValues),
        status: EmailsEnum.STATUS.PENDING
      }

      console.log('Save Email Event:: Received Email', email);
      await this.emailService.saveEmailInDB(email);
      console.log('Save Email Event:: Email Saved');

    } catch (err) {

      console.log(`Save Email Event:: ${err}`);

    }
  }

  @EventPattern('email_failed')
  async updateEmailFaild(email: Email) {
    try {

      console.log('Email Faild Event Pattern:: Received Failed Data', email);
      await this.emailService.updateEmailData({ ...email, status: EmailsEnum.STATUS.FAILED });
      console.log('Save Email Event:: Received Email');

    } catch (error) {

      console.log(`Email Faild Event Pattern:: ${error}`);

    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handleCronJob() {
    try {

      const pendingEmails = await this.emailService.findPendingEmail();

      pendingEmails.forEach(async (pendingEmail) => {

        this.client.emit('send_email', pendingEmail);
        console.log('Cron Job Scheduler:: Request push to nats server');

        await this.emailService.updateEmailData({ ...pendingEmail, status: EmailsEnum.STATUS.SENT });
        console.log(`Cron Job Scheduler:: status update for ${pendingEmail.email}`);

      });

    } catch (err) {

      console.log('Cron Job Scheduler:: ', err);

    }
  }
}
