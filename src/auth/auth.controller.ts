import { Body, Controller, Post } from '@nestjs/common';
import { CheckPhoneDto } from './dtos/check-phone.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { ApiResponse } from 'src/config/classes/api-response';
import { SubmitCodeDto } from './dtos/submit-code.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('check-phone')
  async signIn(@Body() checkPhoneDto: CheckPhoneDto) {
    return new ApiResponse(
      true,
      'phone is exist',
      200,
      await this.authService.checkPhone(checkPhoneDto),
    );
  }

  @Post('submit-code')
  async submitCode(@Body() submitCodeDto: SubmitCodeDto) {
    return new ApiResponse(
      true,
      'You signed in successfully',
      200,
      await this.authService.submitCode(submitCodeDto),
    );
  }

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return new ApiResponse(
      true,
      'You signed up successfully',
      200,
      await this.authService.signUp(createUserDto),
    );
  }
}
