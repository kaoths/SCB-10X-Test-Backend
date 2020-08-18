import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Party } from './party.model';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class PartyService {
  constructor(@InjectModel(
    Party) private readonly model: ReturnModelType<typeof Party>) {
  }

  find(filter?: any): Promise<Party[]> {
    return this.model.find(filter).exec();
  }

  createParty({ title, total }: Party, creatorId: string) {
    const party = new this.model({
      title, total, members: [ creatorId ],
    });
    return party.save();
  }

  async joinParty(userId: string, partyId: string) {
    const exist = this.model.exists({ _id: partyId });
    if (!exist) throw new BadRequestException('Invalid Party ID');

    const party = await this.model.findById(partyId);

    const joined = party.members.includes(userId);
    if (joined) throw new BadRequestException('User already joined the party');
    if (party.members.length === party.total) throw new BadRequestException('The party is full');

    party.members.push(userId);
    return party.save();
  }

  async leaveParty(userId: string, partyId: string) {
    const exist = this.model.exists({ _id: partyId });
    if (!exist) throw new BadRequestException('Invalid Party ID');

    const party = await this.model.findById(partyId);

    const joined = party.members.includes(userId);
    if (!joined) throw new BadRequestException('User is not a member of the party');

    party.members = party.members.filter(memberId => memberId.toString() !== userId);
    return party.save();
  }
}
