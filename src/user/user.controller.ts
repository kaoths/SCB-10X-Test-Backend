import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserId } from '../decorators/user-id.decorator';
import { User } from './user.model';
import { AuthGuard } from '../guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('self')
  self(@UserId() id: string): Promise<User> {
    return this.service.findById(id);
  }
}
