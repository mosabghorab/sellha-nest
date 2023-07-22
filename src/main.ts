import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as fileUpload from 'express-fileupload';
import { Constants } from './config/constants';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('/api/');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.use(fileUpload());
  app.use(compression());
  await app.listen(3000, '0.0.0.0');
  Constants.baseUrl = await app.getUrl();
}

bootstrap();
