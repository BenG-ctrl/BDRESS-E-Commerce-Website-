// profile.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  UploadedFile,
  UseInterceptors,
  HttpStatus,
  HttpException,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileService } from './profile.service';
import { User } from '../schemas/user.schema';
import { AuthGuard } from 'src/auth/auth.guard';
import * as multer from 'multer';
import * as path from 'path';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
} from '@nestjs/swagger';
import { UpdateProfileDto } from './update-profile.dto';

@Controller('profile')
@UseGuards(AuthGuard) // Protect the endpoint with JWT
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getProfile(@Req() req: any) {
    const userId = req.user.id; // Extract user ID from the JWT token
    return this.profileService.getProfile(userId);
  }

  @Post()
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
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
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        password: { type: 'string' },
        bio: { type: 'string' },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Profile updated successfully.' })
  async updateProfile(
    @Req() req: any,
    @Body() updateProfileDto: UpdateProfileDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    try {
      const user = await this.profileService.updateProfile(
        req.user.id,
        updateProfileDto,
        image,
      );
      return { message: 'Profile updated successfully.', user };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
