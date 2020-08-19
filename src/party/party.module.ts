import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Party } from './party.model';
import { PartyController } from './party.controller';
import { PartyService } from './party.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: Party,
        schemaOptions: { timestamps: true },
      },
    ]),
    UserModule,
  ],
  controllers: [PartyController],
  providers: [PartyService],
})
export class PartyModule {}
