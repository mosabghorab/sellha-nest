import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reason } from './entities/reason.entity';
import { CreateReasonDto } from './dtos/create-reason.dto';
import { UpdateReasonDto } from './dtos/update-reason.dto';

@Injectable()
export class ReasonsService {
  constructor(
    @InjectRepository(Reason) private readonly repo: Repository<Reason>,
  ) {}

  async create(body: CreateReasonDto) {
    const reason = await this.repo.create(body);
    return this.repo.save(reason);
  }

  async update(id: number, body: UpdateReasonDto) {
    const reason = await this.findById(id);
    if (!reason) {
      throw new NotFoundException('Reason not found');
    }
    Object.assign(reason, body);
    return this.repo.save(reason);
  }

  async findById(id: number) {
    return this.repo.findOne({
      where: { id },
    });
  }

  async findAll() {
    return this.repo.find();
  }

  async delete(id: number) {
    const reason = await this.findById(id);
    if (!reason) {
      throw new NotFoundException('Reason not found.');
    }
    return this.repo.remove(reason);
  }
}
