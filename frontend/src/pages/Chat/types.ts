export interface Message {
  id: string;
  roomName: string;
  userId: string;
  pictureURL: string;
  data: string;
}

export interface DmType {
  id: string;
  username: string;
  picture: string;
  status: string;
  type: string; // 'DM'
  latestMessage: string;
  messages: Message[];
}

export interface ChannelType {
  id: string;
  name: string;
  role: string; // 'OWNER' | 'ADMIN' | 'MEMBER' | ''
  members: number;
  type: string; // 'PUBLIC' | 'PROTECTED' | 'PRIVATE'
  latestMessage: string;
  messages: Message[];
  isJoined: boolean;
}
