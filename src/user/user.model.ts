import { prop, mongoose } from '@typegoose/typegoose';

export class User {
  _id?: mongoose.Types.ObjectId;

  @prop({ required: true, unique: true })
  username: string;

  @prop({ required: true, select: false })
  password: string;
}
