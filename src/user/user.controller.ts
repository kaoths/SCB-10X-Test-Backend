import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserId } from '../decorators/user-id.decorator';
import { User } from './user.model';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}
  @Get('me')
  me(@UserId() id: string): Promise<User> {
    return this.service.findById(id);
  }
}
