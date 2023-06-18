import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly repo: Repository<Favorite>,
  ) {}

  // add.
  async add(userId: number, productId: number) {
    const favorite = await this.repo.findOne({
      where: {
        userId: userId,
        productId: productId,
      },
    });
    if (favorite) {
      throw new BadRequestException('Product is already in favorite');
    }
    return this.repo.save(await this.repo.create({ productId, userId }));
  }

  // remove.
  async remove(userId: number, productId: number) {
    const favorite = await this.repo.findOne({
      where: {
        userId: userId,
        productId: productId,
      },
    });
    if (!favorite) {
      throw new NotFoundException('Product is not exist in favorite');
    }
    return this.repo.remove(favorite);
  }

  // find.
  async find(userId: number) {
    return await this.repo.find({
      where: {
        userId,
      },
      relations: { product: true },
    });
  }
}
