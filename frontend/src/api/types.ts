export interface TypeDataLogged {
  id: string;
  nickname: string;
  pictureURL: string;
  isTwoFactorAuthEnabled: boolean;
  status: string;
}

export interface TypeDataUsers {
  id: string;
  nickname: string;
  pictureURL: string;
  isFriendToLoggedUser: boolean;
}

export interface TypeDataProfileUser {
  id: string;
  nickname: string;
  pictureURL: string;
  status: string;
  friendsNumber: number;
  isBlockedByLoggedUser: boolean;
  isFriendToLoggedUser: boolean;
  winsNumber: number;
  losesNumber: number;
}

export interface TypedataFriend {
  id: string;
  nickname: string;
  pictureURL: string;
}
