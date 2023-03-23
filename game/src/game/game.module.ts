import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
@Module({
  imports: [],
  controllers: [], // Add WebSocket controllers
  providers: [GameService, GameGateway],
})
export class GameModule {}

// ServeStaticModule.forRoot({
//   rootPath: join('..', 'frontend', 'build'),
//   exclude: ['/api*'],
// }),
