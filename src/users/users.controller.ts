import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @EventPattern('create_user')
  async checkResponse(user: string) {
    await this.userService.createUser(JSON.parse(user));
  }
}
