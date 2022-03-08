import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
