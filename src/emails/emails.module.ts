import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { EmailsController } from './emails.controller';
import { EmailsService } from './emails.service';
import { EmailEntity } from './models/email.entity';

@Module({
  imports: [MailModule, TypeOrmModule.forFeature([EmailEntity])],
  controllers: [EmailsController],
  providers: [EmailsService]
})
export class EmailsModule {}
