import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { UpdateMessageDto } from './dtos/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { Message } from './entities/message.entity';
import { ChatsService } from '../chats/chats.service';
import { CreateMessageUploadFilesDto } from './dtos/create-message-upload-files.dto';
import { UploadImageDto } from '../config/dtos/upload-image-dto';
import { validateDto } from '../config/helpers';
import { Constants } from '../config/constants';
import * as fs from 'fs-extra';
import { MessageType } from './enums/message-type.enum';

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
      await this.prepareCreateMessageUploadFilesDtoFromFiles(files);
    if (
      createMessageDto.type == MessageType.IMAGE &&
      !createMessageUploadFilesDto.content
    ) {
      throw new BadRequestException('Please provide an image content');
    }
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
    createMessageDto.content =
      createMessageUploadFilesDto.content?.name || createMessageDto.content;
    const message = await this.repo.create(createMessageDto);
    message.chat = chat;
    message.sender = sender;
    message.receiver = receiver;
    message.product = product;
    return this.repo.save(message);
  }

  findAll() {
    return `This action returns all messages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }

  // prepare create message upload files dtos from files.
  private async prepareCreateMessageUploadFilesDtoFromFiles(
    files: any,
  ): Promise<CreateMessageUploadFilesDto> {
    const createMessageUploadFilesDto = new CreateMessageUploadFilesDto();
    createMessageUploadFilesDto.content = UploadImageDto.fromFile(
      files?.content,
    );
    await validateDto(createMessageUploadFilesDto);
    await fs.ensureDir(Constants.messagesImagesPath);
    await createMessageUploadFilesDto.content?.mv(
      Constants.messagesImagesPath + createMessageUploadFilesDto.content.name,
    );
    return createMessageUploadFilesDto;
  }
}
