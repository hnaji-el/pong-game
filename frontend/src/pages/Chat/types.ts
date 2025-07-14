export type ChannelType = "PUBLIC" | "PROTECTED" | "PRIVATE";
export type UserRole = "OWNER" | "ADMIN" | "MEMBER" | "BLOCKED";
export type Status = "idle" | "loading" | "success" | "error";

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

export interface Rooms {
  dms: Dm[];
  joinedChannels: Channel[];
  notJoinedChannels: Channel[];
}

export interface MemberType {
  id: string;
  nickname: string;
  status: string;
  pictureURL: string;
  role: string; // 'OWNER' | 'ADMIN' | 'MEMBER' | 'BLOCKED' | ''
}
