import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { PartyService } from './party.service';
import { UserId } from '../decorators/user-id.decorator';
import { Party } from './party.model';

@UseGuards(AuthGuard)
@Controller('party')
export class PartyController {
  constructor(private readonly service: PartyService) {}

  @Get()
  findAll() {
    return this.service.find();
  }

  @Get("joined")
  findJoinedParty(@UserId() id: string) {
    return this.service.find({ members: id })
  }

  @Post()
  createNewParty(
    @Body() dto: Party,
    @UserId() creatorId: string
  ) {
    return this.service.createParty(dto, creatorId);
  }

  @Post(":id/join")
  joinParty(@UserId() userId: string, @Param('id') partyId: string) {
    return this.service.joinParty(userId, partyId);
  }

  @Post(":id/leave")
  leaveParty(@UserId() userId: string, @Param('id') partyId: string) {
    return this.service.leaveParty(userId, partyId);
  }
}
