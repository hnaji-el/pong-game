export type Pos = {
  x: number;
  y: number;
};

export type Shape = {
  h: number;
  w: number;
};

export type Ball = Shape & Pos;

export type Player = { score: number } & Shape & Pos;

export type GameState = {
  players: [Player, Player];
  ball: Ball;
};
