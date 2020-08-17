import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './user.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: User,
        schemaOptions: { timestamps: true },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
