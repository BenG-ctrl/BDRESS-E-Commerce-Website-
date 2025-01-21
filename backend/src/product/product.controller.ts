import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as path from 'path';

@Controller('myProducts')
@UseGuards(AuthGuard) // Apply the AuthGuard to all endpoints in this controller
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getProduct(@Req() request: Request) {
    const userId = request['user'].id; // Extract the user ID from the JWT payload
    console.log('Extracted userId:', userId); // Log the userId for debugging

    const products = await this.productService.fetchProduct(userId);

    if (!products || products.length === 0) {
      console.log('No products found for userId:', userId); // Log if no products are found
      return []; // Return an empty array instead of throwing an error
    }

    console.log('Returning products:', products); // Log the products for debugging
    return products;
  }
  @Get('all') // New endpoint for fetching all products
  async getAllProducts() {
    const products = await this.productService.fetchAllProducts(); // Fetch all products
    console.log('Returning all products:', products); // Log the products for debugging
    return products;
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multer.diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = path.extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    }),
  )
  async addProduct(
    @Req() request: Request,
    @Body() body: any,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (!image) {
      throw new BadRequestException('No image file provided');
    }

    try {
      const imageUrl = await this.productService.uploadImage(image);

      const userId = request['user'].id;

      return this.productService.createNewProduct({
        ...body,
        image: imageUrl,
        userId,
      });
    } catch (error) {
      console.error('Error adding product:', error);
      throw new InternalServerErrorException('Failed to add product');
    }
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteProduct(@Param('id') id: string, @Req() request: Request) {
    return this.productService.deleteProductbyId(id, request['user'].id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  updateSingleProduct(@Param('id') id: string) {}
}
