import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: `${process.env.HOST_URL}:${process.env.PORT}`,
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(5000);
}

bootstrap();
