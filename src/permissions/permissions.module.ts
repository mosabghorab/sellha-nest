import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [PermissionsService],
})
export class PermissionsModule {}
