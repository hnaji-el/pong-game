export interface UserType {
  id: string;
  email: string;
  nickname: string;
  pictureURL: string;
  status: string;
  isTwoFactorAuthEnabled: boolean;
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
