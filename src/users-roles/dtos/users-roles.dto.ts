import { Expose, Type } from 'class-transformer';
import { UserDto } from '../../users/dtos/user.dto';
import { RoleDto } from '../../roles/dtos/role.dto';

export class UsersRolesDto {
  @Expose()
  id: number;

  @Expose()
  userId: number;

  @Expose()
  roleId: number;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;

  @Expose()
  @Type(() => RoleDto)
  role: RoleDto;
}
