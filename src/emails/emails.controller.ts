import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { EmailsService } from './emails.service';
import { Email } from './models/email.interface';

@Controller('emails')
export class EmailsController {
  constructor(private readonly emailService: EmailsService) {}

  @EventPattern('save_email')
  async saveEventData(email: Email) {
    try {
      await this.emailService.saveEmailInDB(email);
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }
}
