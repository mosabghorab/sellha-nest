import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersRoles } from './entities/users-roles.entity';

@Injectable()
export class UsersRolesService {
  constructor(
    @InjectRepository(UsersRoles)
    private readonly repo: Repository<UsersRoles>,
  ) {}

  async create(userId: number, rolesIds: number[]) {
    const usersRoles: UsersRoles[] = [];
    for (const roleId of rolesIds) {
      usersRoles.push(
        await this.repo.create({
          userId,
          roleId,
        }),
      );
    }
    return usersRoles;
  }

  async removeByUserId(userId: number) {
    const usersRoles = await this.repo.find({ where: { userId } });
    for (const userRole of usersRoles) {
      await this.repo.remove(userRole);
    }
    return true;
  }
}
