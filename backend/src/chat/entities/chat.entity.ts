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
  role: string; // 'OWNER' | 'ADMIN' | 'MEMBER' | ''
  members: number;
  type: string; // 'PUBLIC' | 'PROTECTED' | 'PRIVATE'
  latestMessage: string;
  messages: Message[];
  isJoined: boolean;
}

export interface WsDataType {
  isDm: boolean;
  receiverUserId?: string;
  channelId?: string;
  data: string;
}

export interface objectChannel {
  type: string;
  message: string;
  picture: string;
}

export interface userchanel {
  id: string;
  username: string;
  status: string;
  pictureLink: string;
  role: string;
}

export interface Searchchanel {
  name: string;
  type: string;
  isJoined: boolean;
}

export interface chanelprotected {
  id: string;
  name: string;
  members: number;
  latestMessage: string;
  role: string;
  type: string;
  conversation: objectChannel[];
  status: string;
}
