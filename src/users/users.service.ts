import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async findByEmail(email: string, withPassword?: boolean) {
    return await this.repo.findOne({
      where: { email },
      select: withPassword ? this._getCols() : null,
    });
  }

  async findByPhone(phone: string) {
    return await this.repo.findOne({
      where: { phone },
    });
  }

  async create(body: CreateUserDto) {
    const userByPhone = await this.findByPhone(body.phone);
    if (userByPhone) {
      throw new BadRequestException('Phone is already exists.');
    }
    const userByEmail = await this.findByEmail(body.email);
    if (userByEmail) {
      throw new BadRequestException('Email is already exists.');
    }
    return this.repo.save(await this.repo.create(body));
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    return await this.repo.findOne({ where: { id } });
  }

  async update(id: number, body: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    Object.assign(user, body);
    return this.repo.save(user);
  }

  async delete(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return this.repo.remove(user);
  }

  private _getCols(): (keyof User)[] {
    return this.repo.metadata.columns.map(
      (col) => col.propertyName,
    ) as (keyof User)[];
  }
}
