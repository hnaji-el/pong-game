export type ChannelType = 'PUBLIC' | 'PROTECTED' | 'PRIVATE';

export type UserRole = 'OWNER' | 'ADMIN' | 'MEMBER' | 'BLOCKED';

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
  sentAt: string;
}

// export interface Message {
//   id: string;
//   roomName: string;
//   userId: string;
//   pictureURL: string;
//   data: string;
// }

// export interface DmType {
//   id: string;
//   nickname: string;
//   pictureURL: string;
//   status: string;
//   type: string; // 'DM'
//   latestMessage: string;
//   messages: Message[];
// }

// export interface ChannelType {
//   id: string;
//   name: string;
//   role: string; // 'OWNER' | 'ADMIN' | 'MEMBER' | 'BLOCKED' | ''
//   members: number;
//   type: string; // 'PUBLIC' | 'PROTECTED' | 'PRIVATE'
//   latestMessage: string;
//   messages: Message[];
//   isJoined: boolean;
//   isPasswordValid?: boolean;
// }

// export interface MemberType {
//   id: string;
//   nickname: string;
//   status: string;
//   pictureURL: string;
//   role: string; // 'OWNER' | 'ADMIN' | 'MEMBER' | 'BLOCKED' | ''
// }

// export interface WsDataType {
//   isDm: boolean;
//   receiverUserId?: string;
//   channelId?: string;
//   data: string;
// }

// export interface Searchchanel {
//   name: string;
//   type: string;
//   isJoined: boolean;
// }
