import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

type Usertype = {
  name: string;
  email: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
    private httpService: HttpService,
  ) {}

  async createNewUser(user: Usertype) {
    console.log(user);
    let password = await bcrypt.hash(user.password, 10);
    user.password = password;
    return this.userModel.create(user);
  }

  async getUserData(email: string) {
    return this.userModel.findOne({ email });
  }
  async generateToken(payload: any) {
    console.log('Generating token with payload:', payload); // Log the payload for debugging
    return await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1d',
    });
  }
  //   async generateVerificationToken(email: string): Promise<string> {
  //     const payload = { email };
  //     return this.jwtService.signAsync(payload, {
  //       secret: process.env.JWT_SECRET,
  //       expiresIn: '1h', // Token expires in 1 hour
  //     });
  //   }
  //   async sendVerificationEmail(email: string, verificationLink: string) {
  //     const url = 'http://localhost:3000/api/send-verification-email'; // URL of your Next.js API route
  //     const data = { email, verificationLink };

  //     try {
  //       const response = await firstValueFrom(
  //         this.httpService.post(url, data), // Send POST request to Next.js API route
  //       );
  //       console.log('Verification email sent:', response.data);
  //     } catch (error) {
  //       console.error('Failed to send verification email:', error);
  //       throw new Error('Failed to send verification email');
  //     }
  //   }
  //   async verifyToken(token: string): Promise<string | null> {
  //     try {
  //       const payload = await this.jwtService.verifyAsync(token, {
  //         secret: process.env.JWT_SECRET,
  //       });
  //       return payload.email; // Return the email from the token payload
  //     } catch (error) {
  //       console.error('Token verification failed:', error);
  //       return null; // Return null if the token is invalid or expired
  //     }
  //   }

  //   async markUserAsVerified(email: string) {
  //     await this.userModel.updateOne({ email }, { verified: true });
  //   }
}
