import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
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

  @Get(':id')
  findById(@Param('id') partyId: string) {
    return this.service.findById(partyId);
  }

  @Get('joined')
  findJoinedParty(@UserId() id: string) {
    return this.service.find({ members: id });
  }

  @Post()
  createNewParty(@Body() dto: Party, @UserId() creatorId: string) {
    return this.service.createParty(dto, creatorId);
  }

  @Patch(':id')
  updateParty(
    @UserId() userId: string,
    @Param('id') partyId: string,
    @Body() partyDto: Party,
  ) {
    return this.service.updateParty(userId, partyId, partyDto);
  }

  @Delete(':id')
  deleteParty(@UserId() userId: string, @Param('id') partyId: string) {
    return this.service.deleteParty(userId, partyId);
  }

  @Post(':id/join')
  joinParty(@UserId() userId: string, @Param('id') partyId: string) {
    return this.service.joinParty(userId, partyId);
  }

  @Post(':id/leave')
  leaveParty(@UserId() userId: string, @Param('id') partyId: string) {
    return this.service.leaveParty(userId, partyId);
  }
}
