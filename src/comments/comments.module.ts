import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports:[TypeOrmModule.forFeature([Comment]),UsersModule,ProductsModule],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
