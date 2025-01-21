import { Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
    options: any = {},
  ): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      cloudinary.v2.uploader.upload(file.path, options, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url); // result.secure_url is a string
        }
      });
    });
  }
}
