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


export function getFriendsOneUser() {
  axios
    .get(
      `http://localhost:3000/users/friends/${"ddb4904b-2cac-4c30-857a-a9d2cc340f6f"}`,
      {
        withCredentials: true,
        headers: { "Access-Control-Allow-Origin": "localhost:3000" },
      }
    )
    .then((res) => {
      console.log(res);
      
    })
    .catch();
}

export function addFriend() {
  axios
    .post(
      `http://localhost:3000/users/add-friend/${"ddb4904b-2cac-4c30-857a-a9d2cc340f6f"}`,{},
      {
        withCredentials: true,
        headers: { "Access-Control-Allow-Origin": "localhost:3000" },
      }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((error)=>{
      console.log("error");
      console.log(error);
      
    });
}

export function unfriend() {
  axios
    .delete(
      `http://localhost:3000/users/remove-friend/${"ddb4904b-2cac-4c30-857a-a9d2cc340f6f"}`,
      {
        withCredentials: true,
        headers: { "Access-Control-Allow-Origin": "localhost:3000" },
      }
    )
    .then((res) => {
      console.log(res);
    })
    .catch();
}

export function blockFriend() {
  axios
    .patch(
      `http://localhost:3000/users/block-friend/${"cacaff51-c8b7-4e52-920c-133ddfcc7422"}`,
      {},
      {
        withCredentials: true,
        headers: { "Access-Control-Allow-Origin": "localhost:3000" },
      }
    )
    .then((res) => {
      console.log(res);
    })
    .catch();
}

export function unBlockFriend() {
  axios
    .patch(
      `http://localhost:3000/users/unblock-friend/${"cacaff51-c8b7-4e52-920c-133ddfcc7422"}`,
      {},
      {
        withCredentials: true,
        headers: { "Access-Control-Allow-Origin": "localhost:3000" },
      }
    )
    .then((res) => {
      console.log("me");
            
      console.log(res);
    })
    .catch();
}