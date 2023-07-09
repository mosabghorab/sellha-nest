import { Expose, Type } from 'class-transformer';
import { RolesPermissionsDto } from '../../roles-permissions/dtos/roles-permissions.dto';
import { UsersRolesDto } from '../../users-roles/dtos/users-roles.dto';

export class RoleDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => RolesPermissionsDto)
  rolesPermissions: RolesPermissionsDto[];

  @Expose()
  @Type(() => UsersRolesDto)
  usersRoles: UsersRolesDto[];
}
