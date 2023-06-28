import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from '../auth/guards/admin.guard';
import { ApiResponse } from '../config/classes/api-response';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CurrentUser } from 'src/users/custom-decorators/current-user-decorator';
import { FilterProductsDto } from './dtos/filter-products.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { validateDto } from 'src/config/helpers';
import { UploadImageDto } from '../config/dtos/upload-image-dto';
import { CreateProductUploadFilesDto } from './dtos/create-product-upload-files.dto';
import { productPath } from '../config/constants';

// @Injectable()
// export class UploadInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const fileInterceptor = new FileInterceptor('mainImage');
//
//     return fileInterceptor.intercept(context, next).pipe(
//       catchError(async (error) => {
//         const request = context.switchToHttp().getRequest();
//         const errors = await validate(request.body);
//
//         if (errors.length > 0) {
//           throw new BadRequestException('Validation failed');
//         }
//
//         return Promise.reject(error);
//       }),
//     );
//   }
// }

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AdminGuard)
  // @UseInterceptors(UploadInterceptor)
  // @UseInterceptors(
  //   FileInterceptor('mainImage', {
  //     storage: diskStorage({ destination: './uploads' }),
  //   }),
  // )
  @Post()
  async create(
    @CurrentUser() user: any,
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: any,
  ) {
    const imagesUploadImageDto = [];
    const mainImageUploadImageDto = UploadImageDto.fromFile(files?.mainImage);
    for (let i = 0; i < files?.images?.length; i++) {
      const uploadImageDto = UploadImageDto.fromFile(files.images[i]);
      imagesUploadImageDto.push(uploadImageDto);
    }
    const createProductUploadFilesDto = new CreateProductUploadFilesDto();
    createProductUploadFilesDto.mainImage = mainImageUploadImageDto;
    createProductUploadFilesDto.images = imagesUploadImageDto;
    await validateDto(createProductUploadFilesDto);
    await createProductUploadFilesDto.mainImage.mv(
      productPath + createProductUploadFilesDto.mainImage.name,
    );
    for (let i = 0; i < createProductUploadFilesDto.images.length; i++) {
      await createProductUploadFilesDto.images[i].mv(
        productPath + createProductUploadFilesDto.images[i].name,
      );
    }
    return new ApiResponse(
      true,
      'Product created successfully',
      200,
      await this.productsService.create(
        user.id,
        createProductDto,
        createProductUploadFilesDto,
      ),
    );
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return new ApiResponse(
      true,
      'Product updated successfully',
      200,
      await this.productsService.update(id, updateProductDto),
    );
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return new ApiResponse(
      true,
      'Show product',
      200,
      await this.productsService.findOneById(id),
    );
  }

  @Get()
  async getAll(@Query() filterProductsDto: FilterProductsDto) {
    return new ApiResponse(
      true,
      'All products',
      200,
      await this.productsService.findAll(filterProductsDto),
    );
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return new ApiResponse(
      true,
      'Product deleted successfully',
      200,
      await this.productsService.delete(id),
    );
  }
}
