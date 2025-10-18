import { ChannelType, UserRole } from '@prisma/client';

export interface Dm {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  nickname: string;
  pictureURL: string;
  isOnline: boolean;
}

export interface Channel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  type: ChannelType;
  role: UserRole | null;
  isJoined: boolean;
}

export interface RoomData {
  dm: Dm | null;
  channel: Channel | null;
}

export interface Rooms {
  dms: Dm[];
  joinedChannels: Channel[];
  notJoinedChannels: Channel[];
}

export interface ClientMessage {
  isDm: boolean;
  chatId: string;
  content: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  senderPictureUrl: string;
  content: string;
  sentAt: Date;
}
