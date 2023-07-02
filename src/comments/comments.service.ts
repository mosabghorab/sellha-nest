import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { FindOptionsRelations, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Chat } from 'src/chats/entities/chat.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private readonly repo: Repository<Comment>,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
  ) {}


  async create(createCommentDto: CreateCommentDto) {
    const buyer = await this.usersService.findOneById(createCommentDto.buyerId);
    if (!buyer) {
      throw new BadRequestException('Please provide a valid buyer id');
    }
    const seller = await this.usersService.findOneById(createCommentDto.sellerId);
    if (!seller) {
      throw new BadRequestException('Please provide a valid seller id');
    }
    const product = await this.productsService.findOneById(
      createCommentDto.productId,
    );
    if (!product) {
      throw new BadRequestException('Please provide a valid product id');
    }
    const comment = await this.repo.create(createCommentDto);
    comment.buyer = buyer;
    comment.seller = seller;
    comment.product = product;
    return this.repo.save(comment);
  }

  findAll(userId:number) {
    return this.repo.find({where:{sellerId:userId}});
  }

  findOneById(id: number, relations?: FindOptionsRelations<Chat>) {
    return this.repo.findOne({ where: { id }, relations: relations });
  }

  async remove(id: number) {
    const comment = await this.findOneById(id);
    if (!comment) {
      throw new BadRequestException('Please provide a valid comment id');
    }
    return this.repo.remove(comment);
  }
}
