export interface DmRoomMsgsEntity {
  id: string;
  username: string;
  status: string;
  picture: string;
  type: string; // 'DM'
  latestMessage: string | undefined;
  conversation: {
    type: string;
    message: string;
  }[];
}

export interface ChannelRoomMsgsEntity {
  id: string;
  name: string;
  role: string;
  members: number;
  type: string; // 'PUBLIC' | 'PROTECTED' | 'PRIVATE'
  latestMessage: string | undefined;
  conversation: {
    login: string;
    message: string;
    picture: string;
    type?: string;
  }[];
  isJoined?: boolean;
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
