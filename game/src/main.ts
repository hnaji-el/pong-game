import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Replace with your React app URL
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
