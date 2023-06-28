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
      ],
      synchronize: true,
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
  ],
})
export class AppModule {}
