export interface DmType {
  id: string;
  username: string;
  picture: string;
  status: string;
  type: string; // 'DM'
  latestMessage: string;
  conversation: {
    type: string; // ??? 'user' | 'friend'
    message: string;
  }[];
}

export interface ChannelType {
  id: string;
  name: string;
  role: string; // 'OWNER' | 'ADMIN' | 'MEMBER' | ''
  members: number;
  type: string; // 'PUBLIC' | 'PROTECTED' | 'PRIVATE'
  latestMessage: string;
  conversation: {
    login: string;
    message: string;
    picture: string;
    type?: string;
  }[];
  isJoined: boolean;
}

export interface WsDataType {
  isDm: boolean;
  receiverUserId?: string;
  channelId?: string;
  message: string;
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
