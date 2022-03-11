import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailsController } from './emails.controller';
import { EmailsService } from './emails.service';
import { EmailEntity } from './models/email.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    ClientsModule.register([
      {
        name: 'TEST_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: [process.env.NATS_SERVER]
        }
      }
    ]),
    TypeOrmModule.forFeature([EmailEntity])
  ],
  controllers: [EmailsController],
  providers: [EmailsService]
})
export class EmailsModule {}
