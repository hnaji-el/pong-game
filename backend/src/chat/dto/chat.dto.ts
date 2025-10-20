import { ChannelType } from '@prisma/client';
import {
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export type RoomType = 'dm' | 'channel';

export class RoomParamsDto {
  @IsString()
  @IsNotEmpty()
  roomId: string;
}

export class RoomQueryDto {
  @IsIn(['dm', 'channel'])
  @IsNotEmpty()
  type: RoomType;
}

export class CreateChannelDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @IsEnum(ChannelType)
  @IsNotEmpty()
  type: ChannelType;

  @ValidateIf((o) => o.type === ChannelType.PROTECTED)
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password?: string;
}
