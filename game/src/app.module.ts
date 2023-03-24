import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
@Module({
  imports: [GameModule],
  controllers: [], // Add WebSocket controllers
  providers: [],
})
export class AppModule {}

// ServeStaticModule.forRoot({
//   rootPath: join('..', 'frontend', 'build'),
//   exclude: ['/api*'],
// }),
