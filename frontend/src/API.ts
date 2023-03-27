import axios from "axios";
import { useNavigate } from "react-router-dom";

interface TypeDataLogged {
  id: string;
  nickname: string;
  pictureURL: string;
}

export function CheckToken() {
  const navigate = useNavigate();
  axios
    .get("http://localhost:3000/users/logged-user", {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "localhost:3000" },
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
    .get("http://localhost:3000/users/logged-user", {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "localhost:3000" },
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
}

interface TypedataFriend {
  id: string;
  nickname: string;
  pictureURL: string;
}

export function getDataUserLogged(getRes: (res: TypeDataLogged) => void) {
  axios
    .get(`http://localhost:3000/users/logged-user`, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "localhost:3000" },
    })
    .then((res) => {
      getRes(res.data);
    })
    .catch();
}

export function getDataUsers(getRes: (res: TypeDataUesrs[]) => void) {
  axios
    .get(`http://localhost:3000/users`, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "localhost:3000" },
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
    .get(`http://localhost:3000/users/${id}`, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "localhost:3000" },
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
    .get(`http://localhost:3000/users/friends/${id}`, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "localhost:3000" },
    })
    .then((res) => {
      getRes(res.data);
    })
    .catch();
}

export async function addFriend(id: string) {
  await axios
    .post(
      `http://localhost:3000/users/add-friend/${id}`,
      {},
      {
        withCredentials: true,
        headers: { "Access-Control-Allow-Origin": "localhost:3000" },
      }
    )
    .then((res) => {})
    .catch((error) => {});
}

export async function unfriend(id: string) {
  await axios
    .delete(`http://localhost:3000/users/remove-friend/${id}`, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "localhost:3000" },
    })
    .then((res) => {})
    .catch();
}

export async function blockFriend(id: string) {
  await axios
    .patch(
      `http://localhost:3000/users/block-friend/${id}`,
      {},
      {
        withCredentials: true,
        headers: { "Access-Control-Allow-Origin": "localhost:3000" },
      }
    )
    .then((res) => {})
    .catch();
}

export function unBlockFriend(id: string) {
  axios
    .patch(
      `http://localhost:3000/users/unblock-friend/${id}`,
      {},
      {
        withCredentials: true,
        headers: { "Access-Control-Allow-Origin": "localhost:3000" },
      }
    )
    .then((res) => {})
    .catch();
}

//------------------------ chat --------------------------------

export function getFriendChat() {
  axios
    .get("http://localhost:3000/chat/DM-with-all-users", {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "localhost:3000" },
    })
    .then((res: any) => {})
    .catch();
}

export function getDmUsers(getRes: any) {
  axios
    .get("http://localhost:3000/chat/DM-with-all-users", {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "localhost:3000" },
    })
    .then((res) => {
      getRes(res.data);
    })
    .catch();
}

export function getAllChannels(getRes: any) {
  axios
    .get("http://localhost:3000/chat/room-message", {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "localhost:3000" },
    })
    .then((res: any) => {
      getRes(res.data);
    })
    .catch();
}

export function getChannelsDm() {
  axios
    .get("http://localhost:3000/chat/room-message", {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "localhost:3000" },
    })
    .then((res) => {})
    .catch();
}

export async function CreateChannel(getRes: any, data: any) {
  await axios
    .post(
      "http://localhost:3000/chat/create-room",
      { data },
      { withCredentials: true }
    )
    .then((res) => {
      getRes(res);
    })
    .catch((error) => {
      getRes("error");
    });
}

export function getFriendChannel(getRes: any, nameChannel: string) {
  axios
    .get(`http://localhost:3000/chat/friends-in-room/${nameChannel}`, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "localhost:3000" },
    })
    .then((res) => {
      getRes(res.data);
    })
    .catch();
}

export function getMembersChannel(getRes: any, nameChannel: string) {
  axios
    .get(`http://localhost:3000/chat/users-in-room/${nameChannel}`, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "localhost:3000" },
    })
    .then((res) => {
      getRes(res.data);
    })
    .catch();
}

export async function addToRoom(data: any) {
  await axios
    .post(
      "http://localhost:3000/chat/add-to-room",
      { data },
      { withCredentials: true }
    )
    .then()
    .catch();
}

export async function setAdmin(data: any) {
  await axios
    .post(
      "http://localhost:3000/chat/set-admin",
      { data },
      { withCredentials: true }
    )
    .then()
    .catch();
}

export async function setBlock(data: any) {
  await axios
    .patch(
      "http://localhost:3000/chat/ban",
      { data },
      { withCredentials: true }
    )
    .then()
    .catch();
}

export async function setKick(data: any) {
  await axios
    .patch(
      "http://localhost:3000/chat/kick",
      { data },
      { withCredentials: true }
    )
    .then()
    .catch();
}

export async function setMute(data: any) {
  await axios
    .patch(
      "http://localhost:3000/chat/muted",
      { data },
      { withCredentials: true }
    )
    .then()
    .catch();
}

export async function leaveRoom(name: string) {
  await axios
    .post(
      "http://localhost:3000/chat/quite-room",
      { name },
      { withCredentials: true }
    )
    .then()
    .catch();
}

export async function deleteRoom(name: string) {
  await axios
    .delete(`http://localhost:3000/chat/delete-room/${name}`, {
      withCredentials: true,
    })
    .then()
    .catch();
}

export function joinRoom(getRes: any, data: any) {
  console.log("data: ", data);

  axios
    .post(
      "http://localhost:3000/chat/join-room",
      { data },
      { withCredentials: true }
    )
    .then((res) => {
      getRes(res.data);
    })
    .catch();
}
