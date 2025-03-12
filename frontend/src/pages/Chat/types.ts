export type UserRole = "OWNER" | "ADMIN" | "MEMBER" | "BLOCKED" | "NONE";

export type ChannelType_ = "PUBLIC" | "PROTECTED" | "PRIVATE";

export interface Dm {
  id: string;
  userId: string;
  nickname: string;
  pictureURL: string;
  isOnline: boolean;
}

export interface Channel {
  id: string;
  name: string;
  type: ChannelType_;
  role: UserRole;
  isJoined: boolean;
}

export interface Rooms {
  dms: Dm[];
  channels: Channel[];
}

////////////////////////////////////////////

export interface Message {
  id: string;
  roomName: string;
  userId: string;
  pictureURL: string;
  data: string;
}

export interface DmType {
  id: string;
  nickname: string;
  pictureURL: string;
  status: string;
  type: string; // 'DM'
  latestMessage: string;
  messages: Message[];
}

export interface ChannelType {
  id: string;
  name: string;
  role: string; // 'OWNER' | 'ADMIN' | 'MEMBER' | 'BLOCKED' | ''
  members: number;
  type: string; // 'PUBLIC' | 'PROTECTED' | 'PRIVATE'
  latestMessage: string;
  messages: Message[];
  isJoined: boolean;
  isPasswordValid?: boolean;
}

export interface MemberType {
  id: string;
  nickname: string;
  status: string;
  pictureURL: string;
  role: string; // 'OWNER' | 'ADMIN' | 'MEMBER' | 'BLOCKED' | ''
}
