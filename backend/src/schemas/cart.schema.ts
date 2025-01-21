import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from './product.schema';
import { User } from './user.schema';

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  productId: Product;

  @Prop({ required: true, default: 1 })
  quantity: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
