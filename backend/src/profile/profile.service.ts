// profile.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import * as bcrypt from 'bcrypt';
import { UpdateProfileDto } from './update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async getProfile(userId: string) {
    return this.userModel.findById(userId).select('-password'); // Exclude password
  }
  async updateProfile(
    userId: string,
    updateData: UpdateProfileDto,
    image?: Express.Multer.File,
  ): Promise<UserDocument> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    if (updateData.name) {
      user.name = updateData.name;
    }

    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(updateData.password, salt);
    }

    if (updateData.Bio) {
      user.Bio = updateData.Bio;
    }

    if (image) {
      const imageUrl = await this.cloudinaryService.uploadImage(image);
      user.image = imageUrl;
    }

    await user.save();

    return user;
  }
}
