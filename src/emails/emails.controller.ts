import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { EmailsService } from './emails.service';
import { Email } from './models/email.interface';

@Controller('emails')
export class EmailsController {
  constructor(
    private readonly emailService: EmailsService,
    @Inject('TEST_SERVICE')
    private readonly client: ClientProxy
  ) {}

  @EventPattern('save_email')
  async saveEventData(email: Email) {
    try {
      const emailData = await this.emailService.saveEmailInDB(email);
      this.client.emit('send_email', emailData);
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }
}
