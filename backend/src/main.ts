import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();
  app.enableCors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
  });
  app.use(cookieParser());

  await app.listen(process.env.BACKEND_PORT);
}

bootstrap();
