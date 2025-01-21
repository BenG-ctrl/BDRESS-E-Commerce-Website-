import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from '../schemas/cart.schema';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async addToCart(userId: string, productId: string) {
    const cartItem = await this.cartModel.findOne({ userId, productId }).exec();

    if (cartItem) {
      cartItem.quantity += 1;
      return cartItem.save();
    } else {
      const newCartItem = new this.cartModel({
        userId,
        productId,
        quantity: 1,
      });
      return newCartItem.save();
    }
  }

  async getCart(userId: string) {
    return this.cartModel.find({ userId }).populate('productId').exec();
  }

  async updateCartItem(userId: string, productId: string, quantity: number) {
    return this.cartModel
      .findOneAndUpdate({ userId, productId }, { quantity }, { new: true })
      .exec();
  }

  async removeFromCart(userId: string, productId: string) {
    return this.cartModel.findOneAndDelete({ userId, productId }).exec();
  }
}
