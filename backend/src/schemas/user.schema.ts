import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum role {
  Admin = 'Admin',
  User = 'User',
  Costumer = 'Costumer',
}

export enum SubscriptionTier {
  Basic = 'Basic',
  Standard = 'Standard',
  Premium = 'Premium',
}

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  image: string;

  @Prop()
  Bio: string;

  @Prop({ default: false })
  verified: boolean;

  @Prop({ type: String, enum: role, default: role.User })
  role: role;

  @Prop({
    type: String,
    enum: SubscriptionTier,
    default: SubscriptionTier.Basic,
  })
  subscriptionTier: SubscriptionTier;
}

export const UserSchema = SchemaFactory.createForClass(User);
