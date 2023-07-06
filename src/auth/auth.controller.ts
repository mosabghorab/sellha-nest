import { Body, Controller, Post } from '@nestjs/common';
import { CheckPhoneDto } from './dtos/check-phone.dto';
import { AuthService } from './auth.service';
import { ApiResponse } from 'src/config/classes/api-response';
import { SignInWithPhoneDto } from './dtos/sign-in-with-phone.dto';
import { Public } from '../config/metadata/public.metadata';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignInWithEmailPasswordDto } from './dtos/sign-in-with-email-password.dto';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('check-phone')
  async checkPhone(@Body() checkPhoneDto: CheckPhoneDto) {
    return new ApiResponse(
      true,
      'phone is exist',
      200,
      await this.authService.checkPhone(checkPhoneDto),
    );
  }

  @Post('sign-in-with-email-password')
  async signIn(@Body() signInDto: SignInWithEmailPasswordDto) {
    return new ApiResponse(
      true,
      'You signed in successfully',
      200,
      await this.authService.signInWithEmailAndPassword(signInDto),
    );
  }

  @Post('sign-in-with-phone')
  async submitCode(@Body() submitCodeDto: SignInWithPhoneDto) {
    return new ApiResponse(
      true,
      'You signed in successfully',
      200,
      await this.authService.submitCode(submitCodeDto),
    );
  }

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return new ApiResponse(
      true,
      'You signed up successfully',
      200,
      await this.authService.signUp(signUpDto),
    );
  }
}
