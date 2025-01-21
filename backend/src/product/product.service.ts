import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/product.schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

type ProductType = {
  name: string;
  price: number;
  image: string;
  description: string;
  Quantity: number;
  userId: string;
  createdAt: Date;
  deleted: boolean;
};
@Injectable()
export class ProductService {
  constructor(
    private cloudinaryService: CloudinaryService,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  createNewProduct(product: ProductType) {
    return this.productModel.create(product);
  }

  fetchProduct(userId: string) {
    console.log('Fetching products for userId:', userId); // Log the userId for debugging
    return this.productModel.find({ userId }).exec();
  }

  deleteProductbyId(productId: string, userId: string) {
    return this.productModel.deleteOne({ _id: productId, userId });
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    return (await this.cloudinaryService.uploadImage(file, {
      folder: 'b',
    })) as string;
  }
  fetchAllProducts() {
    console.log('Fetching all products'); // Log for debugging
    return this.productModel.find().exec(); // Fetch all products without filtering by userId
  }
}
