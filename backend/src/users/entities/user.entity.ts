export interface UserEntity {
  id: string;
  nickname: string;
  pictureURL: string;
  status: string; // 'online' | 'offline'
  friendsNumber: number;
  isFriendToLoggedUser?: boolean;
  isBlockedByLoggedUser?: boolean;
  is_2FA_Enabled?: boolean;
}