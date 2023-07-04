import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class UsersRoles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  roleId: number;

  // relations.
  // many to one.
  @ManyToOne(() => User, (user) => user.usersRoles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Role, (role) => role.usersRoles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'roleId' })
  role: Role;
}
