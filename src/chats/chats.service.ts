import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dtos/create-chat.dto';
import { UpdateChatDto } from './dtos/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { FindChatsDto } from './dtos/find-chats.dto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat) private readonly repo: Repository<Chat>,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
  ) {}

  async create(createChatDto: CreateChatDto) {
    const buyer = await this.usersService.findOneById(createChatDto.buyerId);
    if (!buyer) {
      throw new BadRequestException('Please provide a valid buyer id');
    }
    const seller = await this.usersService.findOneById(createChatDto.sellerId);
    if (!seller) {
      throw new BadRequestException('Please provide a valid seller id');
    }
    const product = await this.productsService.findOneById(
      createChatDto.productId,
    );
    if (!product) {
      throw new BadRequestException('Please provide a valid product id');
    }
    const chat = await this.repo.create(createChatDto);
    chat.buyer = buyer;
    chat.seller = seller;
    chat.product = product;
    return this.repo.save(chat);
  }

  findAll(
    userId: number,
    findChatsDto: FindChatsDto,
    relations?: FindOptionsRelations<Chat>,
  ) {
    const whereConditions = [{ sellerId: userId }, { buyerId: userId }];
    if (findChatsDto.status) {
      whereConditions.forEach((condition) => {
        condition['status'] = findChatsDto.status;
      });
    }
    return this.repo.find({
      where: whereConditions,
      relations: relations,
    });
  }

  findOneBySellerIdAndBuyerId(
    buyerId: number,
    sellerId: number,
    relations?: FindOptionsRelations<Chat>,
  ) {
    return this.repo.findOne({
      where: { buyerId, sellerId },
      relations: relations,
    });
  }

  findOneById(id: number, relations?: FindOptionsRelations<Chat>) {
    return this.repo.findOne({ where: { id }, relations: relations });
  }

  async update(id: number, updateChatDto: UpdateChatDto) {
    const chat = await this.findOneById(id);
    if (!chat) {
      throw new BadRequestException('Please provide a valid chat id');
    }
    chat.status = updateChatDto.status;
    return this.repo.save(chat);
  }

  async remove(id: number) {
    const chat = await this.findOneById(id);
    if (!chat) {
      throw new BadRequestException('Please provide a valid chat id');
    }
    return this.repo.remove(chat);
  }
}
