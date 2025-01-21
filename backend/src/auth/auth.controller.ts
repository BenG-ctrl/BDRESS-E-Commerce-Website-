import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

type RegisterRequestBody = {
  name: string;
  email: string;
  password: string;
};

type LoginRequestBody = {
  email: string;
  password: string;
};

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterRequestBody) {
    const userExists = await this.authService.getUserData(body.email);

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const createdUser = await this.authService.createNewUser(body);
    // const verificationToken = await this.authService.generateToken({
    //   email: body.email,
    // });

    // const verificationLink = `http://localhost:5000/auth/verify-email?token=${verificationToken}`;
    // await this.authService.sendVerificationEmail(body.email, verificationLink);

    const payload = {
      id: createdUser.id,
      email: createdUser.email,
    };
    const token = await this.authService.generateToken(payload);

    return { token };
  }

  @Post('login')
  async login(@Body() body: LoginRequestBody) {
    console.log('Login attempt for email:', body.email); // Add this line
    console.log('Received credentials:', body); // Log incoming credentials
    const user = await this.authService.getUserData(body.email);

    if (!user) {
      console.log('User not found for email:', body.email);
      throw new NotFoundException('User not found');
    }

    console.log('Found user:', user); // Log retrieved user

    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email or password is wrong');
    }

    const payload = {
      id: user.id,
      email: user.email,
    };
    const token = await this.authService.generateToken(payload);
    console.log('Generated token:', token);
    return { token }; // Return only one token
  }
  @Post('loginGoogle')
  async loginWithGoogle(@Body() body: any) {
    console.log('Received Google login request:', body);

    let googleToken = body.accessToken;
    let response = await fetch(
      'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' +
        googleToken,
    );
    let data: any = await response.json();
    console.log('Google token info:', data);

    if (data.error) {
      console.error('Invalid Google token:', data.error);
      throw new Error('invalid Google');
    }

    let payload = {
      id: data.id,
      email: data.email,
      role: data.role, // Include the role in the token payload
    };
    let token = await this.authService.generateToken(payload);
    console.log('Generated token:', token);
    return token;
  }

  //   @Get('verify-email')
  //   async verifyEmail(@Query('token') token: string) {
  //     const email = await this.authService.verifyToken(token);

  //     if (!email) {
  //       throw new UnauthorizedException('Invalid or expired token');
  //     }

  //     // Mark the user as verified
  //     await this.authService.markUserAsVerified(email);

  //     return { message: 'Email verified successfully' };
  //   }
}
