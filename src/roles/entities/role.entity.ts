import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RolesPermissions } from '../../roles-permissions/entities/roles-permissions.entity';
import { UsersRoles } from '../../users-roles/entities/users-roles.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // relations.
  // one to many.
  @OneToMany(
    () => RolesPermissions,
    (rolesPermissions) => rolesPermissions.role,
    { cascade: true },
  )
  rolesPermissions: RolesPermissions[];

  @OneToMany(() => UsersRoles, (userRole) => userRole.role, { cascade: true })
  usersRoles: UsersRoles[];
}
