import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CartService } from './cart.service';

@Controller('cart')
@UseGuards(AuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  async addToCart(@Req() req, @Body('productId') productId: string) {
    const userId = req.user.id;
    return this.cartService.addToCart(userId, productId);
  }

  @Get()
  async getCart(@Req() req) {
    const userId = req.user.id;
    return this.cartService.getCart(userId);
  }

  @Put(':productId')
  async updateCartItem(
    @Req() req,
    @Param('productId') productId: string,
    @Body('quantity') quantity: number,
  ) {
    const userId = req.user.id;
    return this.cartService.updateCartItem(userId, productId, quantity);
  }

  @Delete(':productId')
  async removeFromCart(@Req() req, @Param('productId') productId: string) {
    const userId = req.user.id;
    return this.cartService.removeFromCart(userId, productId);
  }
}
