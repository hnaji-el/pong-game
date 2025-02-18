export interface UserEntity {
  id: string;
  nickname: string;
  pictureURL: string;
  status: string; // 'online' | 'offline'
  friendsNumber: number;
  winsNumber?: number;
  losesNumber?: number;
  isFriendToLoggedUser?: boolean;
  isBlockedByLoggedUser?: boolean;
  is_2FA_Enabled?: boolean;
}

export interface UserType {
  id: string;
  email: string;
  nickname: string;
  pictureURL: string;
  status: string;
  isTwoFactorAuthEnabled: boolean;
}
