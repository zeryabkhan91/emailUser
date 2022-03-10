import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailsController } from './emails.controller';
import { EmailsService } from './emails.service';
import { EmailEntity } from './models/email.entity';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TEST_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222']
        }
      }
    ]),
    TypeOrmModule.forFeature([EmailEntity])
  ],
  controllers: [EmailsController],
  providers: [EmailsService]
})
export class EmailsModule {}
