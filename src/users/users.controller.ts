import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly mailService: MailService,
    private readonly userService: UsersService
  ) {}

  @EventPattern('create_user')
  async checkResponse(user: string) {
    const createdUser: any = await this.userService.createUser(
      JSON.parse(user)
    );
    await this.mailService.sendEmail(createdUser);
  }
}
