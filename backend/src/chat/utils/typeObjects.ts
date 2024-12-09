export interface DMRoomMsgsType {
  id: string;
  username: string;
  status: string;
  picture: string;
  type: string;
  latestMessage: string | undefined;
  conversation: {
    type: string;
    message: string;
  }[];
}

export interface RoomMsgsType {
  id: string;
  name: string;
  members: number;
  latestMessage: string;
  role: string;
  type: string;
  conversation: {
    login: string;
    message: string;
    picture: string;
  }[];
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
  join: string;
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
