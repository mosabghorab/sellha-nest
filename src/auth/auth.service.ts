import { Injectable, NotFoundException } from '@nestjs/common';
import { CheckPhoneDto } from './dtos/check-phone.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { SignInWithPhoneDto } from './dtos/sign-in-with-phone.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignInWithEmailPasswordDto } from './dtos/sign-in-with-email-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // sign in.
  async signInWithEmailAndPassword(signInDto: SignInWithEmailPasswordDto) {
    const user: User = await this.usersService.findByEmail(
      signInDto.email,
      true,
      { usersRoles: { role: { rolesPermissions: { permission: true } } } },
    );
    if (!user || !(await user.comparePassword(signInDto.password))) {
      throw new NotFoundException('Wrong credentials');
    }
    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      usersRoles: user.usersRoles,
    });
    delete user.password;
    return { ...user, accessToken };
  }

  // check phone.
  async checkPhone(checkPhoneDto: CheckPhoneDto) {
    const user = await this.usersService.findByPhone(checkPhoneDto.phone);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // submit code.
  async submitCode(submitCodeDto: SignInWithPhoneDto) {
    const user: User = await this.usersService.findByPhone(
      submitCodeDto.phone,
      { usersRoles: { role: { rolesPermissions: { permission: true } } } },
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      usersRoles: user.usersRoles,
    });
    return { ...user, accessToken };
  }

  // sign up.
  signUp(signUpDto: SignUpDto) {
    return this.usersService.create(signUpDto);
  }
}
