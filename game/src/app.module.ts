import { Module } from '@nestjs/common';
import { GameService } from './game/game.service';
import { SocketGateway } from './socket/socket.gateway';

@Module({
  imports: [],
  controllers: [], // Add WebSocket controllers
  providers: [GameService, SocketGateway],
})
export class AppModule {}

// ServeStaticModule.forRoot({
//   rootPath: join('..', 'frontend', 'build'),
//   exclude: ['/api*'],
// }),
