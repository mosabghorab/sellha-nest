import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { Favorite } from './favorite/entities/favorite.entity';
import { FavoriteModule } from './favorite/favorite.module';
import { ReasonsModule } from './reasons/reasons.module';
import { Reason } from './reasons/entities/reason.entity';
import { ReportsModule } from './reports/reports.module';
import { Report } from './reports/entities/report.entity';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';
import { ProductImagesModule } from './product-images/product-images.module';
import { ProductImage } from './product-images/entities/product-image.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ChatsModule } from './chats/chats.module';
import { Chat } from './chats/entities/chat.entity';
import { MessagesModule } from './messages/messages.module';
import { Message } from './messages/entities/message.entity';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/entities/comment.entity';
import { AdsModule } from './ads/ads.module';
import { Ad } from './ads/entities/ad.entity';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/entities/role.entity';
import { PermissionsModule } from './permissions/permissions.module';
import { Permission } from './permissions/entities/permission';
import { RolesPermissionsModule } from './roles-permissions/roles-permissions.module';
import { RolesPermissions } from './roles-permissions/entities/roles-permissions.entity';
import { UsersRolesModule } from './users-roles/users-roles.module';
import { UsersRoles } from './users-roles/entities/users-roles.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth.guard';
import { SettingsModule } from './settings/settings.module';
import { Setting } from './settings/entities/setting.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'sellha',
      username: 'root',
      password: '',
      entities: [
        User,
        Category,
        Product,
        Favorite,
        Reason,
        Report,
        Order,
        ProductImage,
        Chat,
        Message,
        Comment,
        Ad,
        Role,
        Permission,
        RolesPermissions,
        UsersRoles,
        Setting,
      ],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AuthModule,
    UsersModule,
    CategoriesModule,
    ProductsModule,
    FavoriteModule,
    ReasonsModule,
    ReportsModule,
    OrdersModule,
    ProductImagesModule,
    ChatsModule,
    MessagesModule,
    CommentsModule,
    AdsModule,
    RolesModule,
    PermissionsModule,
    RolesPermissionsModule,
    UsersRolesModule,
    SettingsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
