import { Injectable, NotFoundException } from '@nestjs/common';
import { CheckPhoneDto } from './dtos/check-phone.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { SubmitCodeDto } from './dtos/submit-code.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // sign in.
  // async signIn(body: SendCodeDto) {
  //   const user: User = await this.usersService.findByEmail(body.email, true);
  //   if (!user || !(await user.comparePassword(body.password))) {
  //     throw new NotFoundException('Wrong credentials');
  //   }
  //   const accessToken = await this.jwtService.signAsync({
  //     id: user.id,
  //     role: user.role,
  //   });
  //   delete user.password;
  //   return { ...user, accessToken };
  // }

  // check phone.
  async checkPhone(checkPhoneDto: CheckPhoneDto) {
    const user = await this.usersService.findByPhone(checkPhoneDto.phone);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // submit code.
  async submitCode(submitCodeDto: SubmitCodeDto) {
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
  signUp(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
