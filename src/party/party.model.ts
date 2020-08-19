import { prop, mongoose, Ref } from '@typegoose/typegoose';
import { User } from '../user/user.model';

export class Party {
  _id?: mongoose.Types.ObjectId;

  @prop({ required: true })
  title: string;

  @prop({ required: true})
  total: number;

  @prop({ ref: User, required: false })
  members?: (Ref<User> | string)[];

  @prop({ ref: User, required: true })
  owner: Ref<User> | string;
}
