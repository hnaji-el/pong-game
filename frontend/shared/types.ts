// import { Socket } from "dgram";

export type Pos = {
  x: number;
  y: number;
};

export type Velocity = {
  dx: number;
  dy: number;
};
export type Shape = {
  h: number;
  w: number;
};

export type Ball = Shape & Pos & Velocity;

export type User = {
  // id: string;
  nickname: string;
};
export type Player = { score: number } & Shape &
  Pos &
  Velocity & {user: User };
export type GameState = {
  players: [Player, Player];
  ball: Ball;
};
