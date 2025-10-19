import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export type RoomType = 'dm' | 'channel';

export class GetRoomParamsDto {
  @IsString()
  @IsNotEmpty()
  roomId: string;
}

export class GetRoomQueryDto {
  @IsIn(['dm', 'channel'])
  @IsNotEmpty()
  type: RoomType;
}
