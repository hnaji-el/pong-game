import { CreateChannel } from "../api/API";

interface TypeData {
  id: string;
  nickname: string;
  pictureURL: string;
  isFriendToLoggedUser: boolean;
}

export function checkNickname(value: string): string {
  if (!value.trim().length) return "Zone text empty";
  if (value.length > 20) return "Maximum 20 characters";

  return "";
}

export function checkChannelName(getRes: any, data: any) {
  CreateChannel((res: any) => {
    getRes(res);
  }, data);
}

export function checkPasswordChannel(value: string): string {
  if (!value.trim().length) return "Zone text empty";

  return "";
}

export function checkDisableCode(value: string): string {
  if (!value.trim().length) return "Zone text empty";
  if (!/^[0-9]+$/.test(value)) return "Digit only";
  if (value.length > 6) return "Maximum 6 digit";
  if (value.length < 6) return "Minimum 6 digit";

  return "";
}

export function checkEnableCode(value: string): string {
  if (!value.trim().length) return "Zone text empty";
  if (!/^[0-9]+$/.test(value)) return "Digit only";
  if (value.length > 6) return "Maximum 6 digit";
  if (value.length < 6) return "Minimum 6 digit";

  return "";
}

export function filterByName(data: TypeData[], value: string): TypeData[] {
  let newData: TypeData[];

  newData = data.filter((e: TypeData) => {
    if (e.nickname.toLowerCase().indexOf(value.toLowerCase()) !== -1) return e;
    return false;
  });
  return newData;
}
