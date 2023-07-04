import { Module } from '@nestjs/common';
import { UsersRolesService } from './users-roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRoles } from './entities/users-roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRoles])],
  providers: [UsersRolesService],
  exports: [UsersRolesService],
})
export class UsersRolesModule {}
