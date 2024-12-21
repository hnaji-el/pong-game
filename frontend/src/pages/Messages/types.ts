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
  role: string;
  members: number;
  type: string; // 'PUBLIC' | 'PROTECTED' | 'PRIVATE'
  latestMessage: string;
  conversation: {
    login: string;
    message: string;
    picture: string;
    type?: string;
  }[];
  isJoined?: boolean;
}
