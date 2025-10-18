import { config } from 'dotenv';
import { expand } from 'dotenv-expand';

expand(config({ path: `.env.${process.env.NODE_ENV || 'development'}` }));

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();
  app.enableCors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
  });
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips away properties that do not have any decorators
      forbidNonWhitelisted: true, // Throws an error if non-whitelisted values are provided
      transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
    }),
  );

  await app.listen(process.env.BACKEND_PORT);
}

bootstrap();
