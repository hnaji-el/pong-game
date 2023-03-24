import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://192.168.1.5:3001',
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(3000);
}

bootstrap();

// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();
// import { UsersService } from './users/users.service';
// import { PrismaService } from './prisma/prisma.service';

// const userService = new UsersService(new PrismaService());

// async function main() {
//   try {
//     const user = await prisma.relationShip.createMany({
//       data: [
//         {
//           requesterId: '709055ee-cfa8-4776-bd19-2f5cda930d4b',
//           addresseeId: '6fafe515-4828-4f8f-9233-1ffe9d928c31',
//           type: 'FRIENDSHIP',
//         },
//         {
//           requesterId: '709055ee-cfa8-4776-bd19-2f5cda930d4b',
//           addresseeId: '04f66e1c-17dc-4e40-8316-189c7634570f',
//           type: 'FRIENDSHIP',
//         },
//         {
//           requesterId: '481bfe15-8d2a-44c8-951d-0e89f7dc747e',
//           addresseeId: '709055ee-cfa8-4776-bd19-2f5cda930d4b',
//           type: 'BLOCK',
//         },
//       ],
//     });
//     console.log(user);
//   } catch (e) {
//     console.error(e.message);
//   }
// }

// main();

// const user = await prisma.user.createMany({
//   data: [
//     { nickname: 'hamid', pictureURL: '' },
//     { nickname: 'azeddine', pictureURL: '' },
//     { nickname: 'youssef', pictureURL: '' },
//     { nickname: 'ayoub', pictureURL: '' },
//   ],
// });
// const user = await prisma.relationShip.createMany({
//   data: [
//     { requesterId: 1, addresseeId: 2, type: 'FRIENDSHIP' },
//     { requesterId: 3, addresseeId: 1, type: 'FRIENDSHIP' },
//     { requesterId: 1, addresseeId: 4, type: 'BLOCK' },
//     { requesterId: 2, addresseeId: 4, type: 'FRIENDSHIP' },
//   ],
// });
