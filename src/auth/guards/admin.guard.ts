import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/config/enums/user-role.enum';
import { extractTokenFromHeader } from '../../config/helpers';
import { Constants } from '../../config/constants';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      request.user = await this.jwtService.verifyAsync(token, {
        secret: Constants.jwt.secret,
      });
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
    if (request.user.role != UserRole.ADMIN) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
