import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as fileUpload from 'express-fileupload';
import { Constants } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('/api/v1/');
  app.use(fileUpload());
  await app.listen(3000, '0.0.0.0');
  Constants.baseUrl = await app.getUrl();
}

bootstrap();
