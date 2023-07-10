import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { can, extractTokenFromHeader } from '../../config/helpers';
import { Reflector } from '@nestjs/core';
import { STRICT_KEY } from '../../config/metadata/strict.metadata';
import { PUBLIC_KEY } from '../../config/metadata/public.metadata';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<any>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      request.user = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch {
      throw new UnauthorizedException();
    }
    const { permissionAction, permissionGroup } =
      this.reflector.getAllAndOverride<any>(STRICT_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
    if (!can(permissionAction, permissionGroup, request.user.usersRoles)) {
      throw new ForbiddenException();
    }
    return true;
  }
}
