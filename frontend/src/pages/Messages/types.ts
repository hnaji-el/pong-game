export interface ChannelType {
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
