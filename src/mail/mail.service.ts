import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { User } from 'src/users/models/user.interface';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  sendEmail(user: User) {
    try {
      from(
        this.mailerService.sendMail({
          to: user.email,
          subject: 'Welcome to nats micro-service',
          template: 'accept',
          context: {
            name: user.name
          }
        })
      );
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }
}
