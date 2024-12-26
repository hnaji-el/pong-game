import React from "react";

import axios from "axios";

import {
  UserType,
  TypeDataUsers,
  TypeDataProfileUser,
  TypedataFriend,
} from "./types";
import { ChannelType, DmType } from "../pages/Messages/types";

const BACKEND_ORIGIN =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_BACKEND_ORIGIN
    : `${import.meta.env.VITE_BACKEND_ORIGIN}${import.meta.env.VITE_PROXY_PREFIX_FOR_BACKEND}`;

export function useVerifyUserAuthenticity(isOnLoginPage = false) {
  const [status, setStatus] = React.useState("pending"); // 'pending' | 'success' | 'error'

  React.useEffect(() => {
    const verifyAuthenticity = async () => {
      try {
        const response = await fetch(`${BACKEND_ORIGIN}/auth/validate-token`, {
          credentials: "include",
        });

        if (
          (isOnLoginPage && !response.ok) ||
          (!isOnLoginPage && response.ok)
        ) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (error) {
        isOnLoginPage ? setStatus("success") : setStatus("error");
      }
    };

    verifyAuthenticity();
  });

  return status;
}

export function getDataUserLogged(getRes: (res: UserType) => void) {
  axios
    .get(`${BACKEND_ORIGIN}/users/logged-user`, {
      withCredentials: true,
    })
    .then((res) => {
      getRes(res.data);
    })
    .catch();
}

export function getDataUsers(getRes: (res: TypeDataUsers[]) => void) {
  axios
    .get(`${BACKEND_ORIGIN}/users`, {
      withCredentials: true,
    })
    .then((res) => {
      getRes(res.data);
    })
    .catch();
}

export function getOneUser(
  getRes: (res: TypeDataProfileUser) => void,
  id: string,
) {
  axios
    .get(`${BACKEND_ORIGIN}/users/${id}`, {
      withCredentials: true,
    })
    .then((res) => {
      getRes(res.data);
    })
    .catch();
}

export function getFriendsOneUser(
  getRes: (res: TypedataFriend[]) => void,
  id: string,
) {
  axios
    .get(`${BACKEND_ORIGIN}/users/friends/${id}`, {
      withCredentials: true,
    })
    .then((res) => {
      getRes(res.data);
    })
    .catch();
}

export async function addFriend(id: string) {
  await axios
    .post(
      `${BACKEND_ORIGIN}/users/add-friend/${id}`,
      {},
      {
        withCredentials: true,
      },
    )
    .then(() => {})
    .catch(() => {});
}

export async function unfriend(id: string) {
  await axios
    .delete(`${BACKEND_ORIGIN}/users/remove-friend/${id}`, {
      withCredentials: true,
    })
    .then(() => {})
    .catch();
}

export async function blockFriend(id: string) {
  await axios
    .patch(
      `${BACKEND_ORIGIN}/users/block-friend/${id}`,
      {},
      {
        withCredentials: true,
      },
    )
    .then(() => {})
    .catch();
}

export function unBlockFriend(id: string) {
  axios
    .patch(
      `${BACKEND_ORIGIN}/users/unblock-friend/${id}`,
      {},
      {
        withCredentials: true,
      },
    )
    .then(() => {})
    .catch();
}

/*
 * Chat
 */

export function getAllDms(getRes: (res: DmType[]) => void) {
  axios
    .get(`${BACKEND_ORIGIN}/chat/dms/dms-messages`, {
      withCredentials: true,
    })
    .then((res) => {
      getRes(res.data);
    })
    .catch();
}

export function getAllChannels(getRes: (res: ChannelType[]) => void) {
  axios
    .get(`${BACKEND_ORIGIN}/chat/channels/channels-messages`, {
      withCredentials: true,
    })
    .then((res: any) => {
      getRes(res.data);
    })
    .catch();
}

export function getChannelsDm() {
  axios
    .get(`${BACKEND_ORIGIN}/chat/channels/channels-messages`, {
      withCredentials: true,
    })
    .then((res) => {})
    .catch();
}

export async function CreateChannel(getRes: any, data: any) {
  await axios
    .post(
      `${BACKEND_ORIGIN}/chat/channels/create-channel`,
      { data },
      { withCredentials: true },
    )
    .then((res) => {
      getRes(res);
    })
    .catch((error) => {
      getRes("error");
    });
}

export function joinRoom(
  getRes: (channelData: ChannelType) => void,
  data: {
    name: string;
    type: string;
  },
) {
  axios
    .post(
      `${BACKEND_ORIGIN}/chat/join-room`,
      { data },
      { withCredentials: true },
    )
    .then((res) => {
      getRes(res.data);
    })
    .catch();
}

export function getFriendChannel(getRes: any, nameChannel: string) {
  axios
    .get(`${BACKEND_ORIGIN}/chat/friends-in-room/${nameChannel}`, {
      withCredentials: true,
    })
    .then((res) => {
      getRes(res.data);
    })
    .catch();
}

export function getMembersChannel(getRes: any, nameChannel: string) {
  axios
    .get(`${BACKEND_ORIGIN}/chat/users-in-room/${nameChannel}`, {
      withCredentials: true,
    })
    .then((res) => {
      getRes(res.data);
    })
    .catch();
}

export async function addToRoom(data: any) {
  await axios
    .post(
      `${BACKEND_ORIGIN}/chat/add-to-room`,
      { data },
      { withCredentials: true },
    )
    .then()
    .catch();
}

export async function setAdmin(data: any) {
  await axios
    .post(
      `${BACKEND_ORIGIN}/chat/set-admin`,
      { data },
      { withCredentials: true },
    )
    .then()
    .catch();
}

export async function setBlock(data: any) {
  await axios
    .patch(`${BACKEND_ORIGIN}/chat/ban`, { data }, { withCredentials: true })
    .then()
    .catch();
}

export async function setKick(data: any) {
  await axios
    .patch(`${BACKEND_ORIGIN}/chat/kick`, { data }, { withCredentials: true })
    .then()
    .catch();
}

export async function setMute(data: any) {
  await axios
    .patch(`${BACKEND_ORIGIN}/chat/muted`, { data }, { withCredentials: true })
    .then()
    .catch();
}

export async function leaveRoom(name: string) {
  await axios
    .post(
      `${BACKEND_ORIGIN}/chat/quite-room`,
      { name },
      { withCredentials: true },
    )
    .then()
    .catch();
}

export async function deleteRoom(name: string) {
  await axios
    .delete(`${BACKEND_ORIGIN}/chat/delete-room/${name}`, {
      withCredentials: true,
    })
    .then()
    .catch();
}

export async function editPicture(file: any) {
  let fd: FormData = new FormData();
  fd.append("file", file);

  await axios
    .post(`${BACKEND_ORIGIN}/users/upload-profile-picture`, fd, {
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
    .patch(`${BACKEND_ORIGIN}/users/update_nickname`, obj, {
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
      `${BACKEND_ORIGIN}/2fa/generate`,
      {},
      {
        withCredentials: true,
      },
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
    .post(`${BACKEND_ORIGIN}/2fa/verification`, obj, {
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
      `${BACKEND_ORIGIN}/2fa/turn-on`,
      {},
      {
        withCredentials: true,
      },
    )
    .then()
    .catch();
}

export async function turnOffTfa() {
  await axios
    .post(
      `${BACKEND_ORIGIN}/2fa/turn-off`,
      {},
      {
        withCredentials: true,
      },
    )
    .then()
    .catch();
}

export function getAchievements(getRes: any, id: string) {
  axios
    .get(`${BACKEND_ORIGIN}/users/game/achievement/${id}`, {
      withCredentials: true,
    })
    .then((res) => {
      getRes(res.data);
    })
    .catch();
}

export function getMatchHistory(getRes: any, id: string) {
  axios
    .get(`${BACKEND_ORIGIN}/users/game/match-history/${id}`, {
      withCredentials: true,
    })
    .then((res) => {
      getRes(res.data);
    })
    .catch();
}

export async function logout() {
  await axios
    .get(`${BACKEND_ORIGIN}/auth/logout`, {
      withCredentials: true,
    })
    .then()
    .catch();
}
