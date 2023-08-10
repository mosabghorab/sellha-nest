import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { Message } from './entities/message.entity';
import { ChatsService } from '../chats/chats.service';
import { CreateMessageUploadFilesDto } from './dtos/create-message-upload-files.dto';
import { UploadImageDto } from '../config/dtos/upload-image-dto';
import { saveFile, validateDto } from '../config/helpers';
import { Constants } from '../config/constants';
import { MessageType } from './enums/message-type.enum';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { Chat } from '../chats/entities/chat.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { FindMessagesDto } from './dtos/find-messages.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private readonly repo: Repository<Message>,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly chatsService: ChatsService,
  ) {}

  async create(createMessageDto: CreateMessageDto, files: any) {
    if (
      createMessageDto.type == MessageType.TEXT &&
      !createMessageDto.content
    ) {
      throw new BadRequestException('Please provide an text content');
    }
    const createMessageUploadFilesDto =
      await this._prepareCreateMessageUploadFilesDtoFromFiles(files);
    if (
      createMessageDto.type == MessageType.IMAGE &&
      !createMessageUploadFilesDto.content
    ) {
      throw new BadRequestException('Please provide an image content');
    }
    const { chat, sender, receiver, product } = await this._validateRelations(
      createMessageDto,
    );
    createMessageDto.content =
      createMessageUploadFilesDto.content?.name || createMessageDto.content;
    const message = await this.repo.create(createMessageDto);
    message.chat = chat;
    message.sender = sender;
    message.receiver = receiver;
    message.product = product;
    return this.repo.save(message);
  }

  async findAll(
    userId: number,
    findMessagesDto: FindMessagesDto,
    relations?: FindOptionsRelations<Message>,
  ) {
    const chat = await this.chatsService.findOneById(findMessagesDto.chatId);
    if (!chat) {
      throw new BadRequestException('Please provide a valid chat id');
    }
    await this.repo.update(
      { chatId: findMessagesDto.chatId, receiverId: userId },
      { isRead: true },
    );
    return this.repo.find({
      where: { chatId: findMessagesDto.chatId },
      relations: relations,
    });
  }

  findOneById(id: number, relations?: FindOptionsRelations<Chat>) {
    return this.repo.findOne({ where: { id }, relations: relations });
  }

  async remove(id: number) {
    const message = await this.findOneById(id);
    if (!message) {
      throw new BadRequestException('Please provide a valid message id');
    }
    return this.repo.remove(message);
  }

  // prepare create message upload files dto from files.
  private async _prepareCreateMessageUploadFilesDtoFromFiles(
    files: any,
  ): Promise<CreateMessageUploadFilesDto> {
    const createMessageUploadFilesDto = new CreateMessageUploadFilesDto();
    createMessageUploadFilesDto.content = UploadImageDto.fromFile(
      files?.content,
    );
    await validateDto(createMessageUploadFilesDto);
    await saveFile(
      Constants.messagesImagesPath,
      createMessageUploadFilesDto.content.name,
      createMessageUploadFilesDto.content,
    );
    return createMessageUploadFilesDto;
  }

  private async _validateRelations(
    createMessageDto: CreateMessageDto,
  ): Promise<{ chat: Chat; sender: User; receiver: User; product: Product }> {
    const chat = await this.chatsService.findOneById(createMessageDto.chatId);
    if (!chat) {
      throw new BadRequestException('Please provide a valid chat id');
    }
    const sender = await this.usersService.findOneById(
      createMessageDto.senderId,
    );
    if (!sender) {
      throw new BadRequestException('Please provide a valid sender id');
    }
    const receiver = await this.usersService.findOneById(
      createMessageDto.receiverId,
    );
    if (!receiver) {
      throw new BadRequestException('Please provide a valid receiver id');
    }
    const product = await this.productsService.findOneById(
      createMessageDto.productId,
    );
    if (!product) {
      throw new BadRequestException('Please provide a valid product id');
    }
    return { chat, sender, receiver, product };
  }
}
