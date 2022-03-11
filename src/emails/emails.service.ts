import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import EmailsEnums from './enums/emails.enums';
import { EmailEntity } from './models/email.entity';
import { Email } from './models/email.interface';

@Injectable()
export class EmailsService {
  constructor(
    @InjectRepository(EmailEntity)
    private readonly emailRepository: Repository<EmailEntity>
  ) {}

  async saveEmailInDB(emailBody: Email): Promise<Email> {
    return await this.emailRepository.save(emailBody);
  }

  async fetchEmailData(): Promise<Email[]> {
    return await this.emailRepository.find();
  }

  async findById(id: number): Promise<Email> {
    return await this.emailRepository.findOne(id);
  }

  async findPendingEmail(): Promise<Email[]> {
    return await this.emailRepository.find({
      where: { status: Not(EmailsEnums.STATUS.SENT)},
      order: { priority: 'ASC' }
    });
  }

  async updateEmailData(emailBody: Email): Promise<Email> {
    return await this.emailRepository.save(emailBody);
  }
}
