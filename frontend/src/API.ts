import axios from "axios";

interface TypeDataLogged {
  id: string;
  nickname: string;
  pictureURL: string;
}

interface TypeDataUesrs {
  id: number;
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

export function getDataUserLogged(getRes:(res:TypeDataLogged)=>void) {
  axios
    .get(`http://localhost:3000/users/logged-user`, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "localhost:3000" },
    })
    .then((res) => {
      getRes(res.data)
    })
    .catch();
}

export function getDataUsers(getRes:(res:TypeDataUesrs[])=>void) {
  axios
    .get(`http://localhost:3000/users`, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "localhost:3000" },
    })
    .then((res) => {
      getRes(res.data)
    })
    .catch();
}

export function getOneUser(getRes:(res:TypeDataProfileUser)=>void,id:string) {
  axios
    .get(
      `http://localhost:3000/users/${id}`,
      {
        withCredentials: true,
        headers: { "Access-Control-Allow-Origin": "localhost:3000" },
      }
    )
    .then((res) => {
      getRes(res.data)
    })
    .catch();
}


export function getFriendsOneUser(getRes:(res:TypedataFriend[])=>void,id:string) {
  axios
    .get(
      `http://localhost:3000/users/friends/${id}`,
      {
        withCredentials: true,
        headers: { "Access-Control-Allow-Origin": "localhost:3000" },
      }
    )
    .then((res) => {
      getRes(res.data)
    })
    .catch();
}

export function addFriend(id:string) {
  axios
    .post(
      `http://localhost:3000/users/add-friend/${id}`,{},
      {
        withCredentials: true,
        headers: { "Access-Control-Allow-Origin": "localhost:3000" },
      }
    )
    .then((res) => {
    })
    .catch((error)=>{
    });
}

export function unfriend(id:string) {
  axios
    .delete(
      `http://localhost:3000/users/remove-friend/${id}`,
      {
        withCredentials: true,
        headers: { "Access-Control-Allow-Origin": "localhost:3000" },
      }
    )
    .then((res) => {
    })
    .catch();
}

export function blockFriend(id:string) {
  axios
    .patch(
      `http://localhost:3000/users/block-friend/${id}`,
      {},
      {
        withCredentials: true,
        headers: { "Access-Control-Allow-Origin": "localhost:3000" },
      }
    )
    .then((res) => {
    })
    .catch();
}

export function unBlockFriend(id:string) {
  axios
    .patch(
      `http://localhost:3000/users/unblock-friend/${id}`,
      {},
      {
        withCredentials: true,
        headers: { "Access-Control-Allow-Origin": "localhost:3000" },
      }
    )
    .then((res) => {
    })
    .catch();
}