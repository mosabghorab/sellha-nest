import { Module } from '@nestjs/common';
import { RolesPermissionsService } from './roles-permissions.service';
import { RolesPermissionsController } from './roles-permissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesPermissions } from './entities/roles-permissions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolesPermissions])],
  controllers: [RolesPermissionsController],
  providers: [RolesPermissionsService],
  exports: [RolesPermissionsService],
})
export class RolesPermissionsModule {}
