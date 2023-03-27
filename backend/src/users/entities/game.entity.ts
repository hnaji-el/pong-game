export interface GameEntity {
  id: string;
  nickname: string;
  pictureURL: string;
  score: string;
  gameState: string; // 'WIN' | 'LOSE'
  winsNumber: number;
  losesNumber: number;
}
