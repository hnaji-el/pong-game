import axios from "axios";
import { useNavigate } from "react-router-dom";

const domain = import.meta.env.VITE_BACKEND_URL;

interface TypeDataLogged {
  id: string;
  nickname: string;
  pictureURL: string;
  isTwoFactorAuthEnabled: boolean;
  status: string;
}

export function CheckToken() {
  const navigate = useNavigate();
  axios
    .get(`${domain}/users/logged-user`, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": `${domain}` },
    })
    .then()
    .catch((error) => {
      if (error.response.data.statusCode === 401) {
        navigate("/Login");
      }
    });
}

export function CheckTokenLogin(getRes: any) {
  const navigate = useNavigate();
  axios
    .get(`${domain}/users/logged-user`, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": `${domain}` },
    })
    .then(() => {
      getRes("200");
      navigate("/Home");
    })
    .catch((error) => {
      getRes("error");
    });
}

interface TypeDataProfileUser {
  friendsNumber: number;
  id: string;
  nickname: string;
  pictureURL: string;
}

interface TypeDataUesrs {
  id: string;
  nickname: string;
  pictureURL: string;
  isFriendToLoggedUser: boolean;
}

interface TypeDataProfileUser {
  friendsNumber: number;
  id: string;
  isBlockedByLoggedUser: boolean;
  isFriendToLoggedUser: boolean;
  nickname: string;
  pictureURL: string;
  status: string;
  winsNumber: number;
  losesNumber: number;
}

interface TypedataFriend {
  id: string;
  nickname: string;
  pictureURL: string;
}

export function getDataUserLogged(getRes: (res: TypeDataLogged) => void) {
  axios
    .get(`${domain}/users/logged-user`, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": `${domain}` },
    })
    .then((res) => {
      getRes(res.data);
    })
    .catch();
}

export function getDataUsers(getRes: (res: TypeDataUesrs[]) => void) {
  axios
    .get(`${domain}/users`, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": `${domain}` },
    })
    .then((res) => {
      getRes(res.data);
    })
    .catch();
}

export function getOneUser(
  getRes: (res: TypeDataProfileUser) => void,
  id: string
) {
  axios
    .get(`${domain}/users/${id}`, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": `${domain}` },
    })
    .then((res) => {
      getRes(res.data);
    })
    .catch();
}

export function getFriendsOneUser(
  getRes: (res: TypedataFriend[]) => void,
  id: string
) {
  axios
    .get(`${domain}/users/friends/${id}`, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": `${domain}` },
    })
    .then((res) => {
      getRes(res.data);
    })
    .catch();
}

export async function addFriend(id: string) {
  await axios
    .post(
      `${domain}/users/add-friend/${id}`,
      {},
      {
        withCredentials: true,
        headers: { "Access-Control-Allow-Origin": `${domain}` },
      }
    )
    .then((res) => {})
    .catch((error) => {});
}

export async function unfriend(id: string) {
  await axios
    .delete(`${domain}/users/remove-friend/${id}`, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": `${domain}` },
    })
    .then((res) => {})
    .catch();
}

export async function blockFriend(id: string) {
  await axios
    .patch(
      `${domain}/users/block-friend/${id}`,
      {},
      {
        withCredentials: true,
        headers: { "Access-Control-Allow-Origin": `${domain}` },
      }
    )
    .then((res) => {})
    .catch();
}

export function unBlockFriend(id: string) {
  axios
    .patch(
      `${domain}/users/unblock-friend/${id}`,
      {},
      {
        withCredentials: true,
        headers: { "Access-Control-Allow-Origin": `${domain}` },
      }
    )
    .then((res) => {})
    .catch();
}

//------------------------ chat --------------------------------

export function getFriendChat() {
  axios
    .get(`${domain}/chat/DM-with-all-users`, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": `${domain}` },
    })
    .then((res: any) => {})
    .catch();
}

export function getDmUsers(getRes: any) {
  axios
    .get(`${domain}/chat/DM-with-all-users`, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": `${domain}` },
    })
    .then((res) => {
      getRes(res.data);
    })
    .catch();
}

export function getAllChannels(getRes: any) {
  axios
    .get(`${domain}/chat/room-message`, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": `${domain}` },
    })
    .then((res: any) => {
      getRes(res.data);
    })
    .catch();
}

export function getChannelsDm() {
  axios
    .get(`${domain}/chat/room-message`, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": `${domain}` },
    })
    .then((res) => {})
    .catch();
}

export async function CreateChannel(getRes: any, data: any) {
  await axios
    .post(`${domain}/chat/create-room`, { data }, { withCredentials: true })
    .then((res) => {
      getRes(res);
    })
    .catch((error) => {
      getRes("error");
    });
}

export function getFriendChannel(getRes: any, nameChannel: string) {
  axios
    .get(`${domain}/chat/friends-in-room/${nameChannel}`, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": `${domain}` },
    })
    .then((res) => {
      getRes(res.data);
    })
    .catch();
}

export function getMembersChannel(getRes: any, nameChannel: string) {
  axios
    .get(`${domain}/chat/users-in-room/${nameChannel}`, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": `${domain}` },
    })
    .then((res) => {
      getRes(res.data);
    })
    .catch();
}

export async function addToRoom(data: any) {
  await axios
    .post(`${domain}/chat/add-to-room`, { data }, { withCredentials: true })
    .then()
    .catch();
}

export async function setAdmin(data: any) {
  await axios
    .post(`${domain}/chat/set-admin`, { data }, { withCredentials: true })
    .then()
    .catch();
}

export async function setBlock(data: any) {
  await axios
    .patch(`${domain}/chat/ban`, { data }, { withCredentials: true })
    .then()
    .catch();
}

export async function setKick(data: any) {
  await axios
    .patch(`${domain}/chat/kick`, { data }, { withCredentials: true })
    .then()
    .catch();
}

export async function setMute(data: any) {
  await axios
    .patch(`${domain}/chat/muted`, { data }, { withCredentials: true })
    .then()
    .catch();
}

export async function leaveRoom(name: string) {
  await axios
    .post(`${domain}/chat/quite-room`, { name }, { withCredentials: true })
    .then()
    .catch();
}

export async function deleteRoom(name: string) {
  await axios
    .delete(`${domain}/chat/delete-room/${name}`, {
      withCredentials: true,
    })
    .then()
    .catch();
}

export function joinRoom(getRes: any, data: any) {
  console.log("data: ", data);

  axios
    .post(`${domain}/chat/join-room`, { data }, { withCredentials: true })
    .then((res) => {
      getRes(res.data);
    })
    .catch();
}

export async function editPicture(file: any) {
  let fd: FormData = new FormData();
  fd.append("file", file);

  await axios
    .post(`${domain}/users/upload-profile-picture`, fd, {
      withCredentials: true,
    })
    .then()
    .catch();
}

export async function editNickname(getRes: any, nickname: string) {
  let obj = {
    nickname: nickname,
  };
  await axios
    .patch(`${domain}/users/update_nickname`, obj, {
      withCredentials: true,
    })
    .then(() => {
      getRes("valid");
    })
    .catch(() => {
      getRes("invalid");
    });
}

export async function generateQrCode(getRes: any) {
  await axios
    .post(
      `${domain}/2fa/generate`,
      {},
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      getRes(res.data);
    })
    .catch();
}

export async function QrcodeValidation(getRes: any, code: string) {
  let obj = {
    twoFactorAuthCode: code,
  };
  await axios
    .post(`${domain}/2fa/verification`, obj, {
      withCredentials: true,
    })
    .then((res) => {
      getRes("valide");
    })
    .catch(() => {
      getRes("invalide");
    });
}

export async function turOnTfa() {
  await axios
    .post(
      `${domain}/2fa/turn-on`,
      {},
      {
        withCredentials: true,
      }
    )
    .then()
    .catch();
}

export async function turnOffTfa() {
  await axios
    .post(
      `${domain}/2fa/turn-off`,
      {},
      {
        withCredentials: true,
      }
    )
    .then()
    .catch();
}

export function getAchievements(getRes: any, id: string) {
  axios
    .get(`${domain}/users/game/achievement/${id}`, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": `${domain}` },
    })
    .then((res) => {
      getRes(res.data);
    })
    .catch();
}

export function getMatchHistory(getRes: any, id: string) {
  axios
    .get(`${domain}/users/game/match-history/${id}`, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": `${domain}` },
    })
    .then((res) => {
      getRes(res.data);
    })
    .catch();
}

export async function logout() {
  await axios
    .get(`${domain}/auth/logout`, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": `${domain}` },
    })
    .then()
    .catch();
}
