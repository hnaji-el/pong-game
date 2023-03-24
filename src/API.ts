import axios from "axios";

export const dataAllUser = [
    {
        id: 1,
        username: "mouassit",
        picture: "https://cdn.intra.42.fr/users/2cc53519ab737304bcdd74e4125c3e61/mouassit.jpg",
        friend:false
    },
    {
        id: 2,
        username: "ayafdel",
        picture: "https://cdn.intra.42.fr/users/cc4982ccc40e74b602bea75ae97172ff/ayafdel.jpg",
        friend:false
    },
    {
        id: 3,
        username: "hnaji-el",
        picture: "https://cdn.intra.42.fr/users/fa83d9b95ae3ef290cac43d9c4c1010d/hnaji-el.jpg",
        friend:false
    },

    {
        id: 4,
        username: "ael-hach",
        picture: "https://cdn.intra.42.fr/users/724af684949109f7ab378b3c2317db06/ael-hach.jpg",
        friend:false
    },
    {
        id: 5,
        username: "mobaz",
        picture: "https://cdn.intra.42.fr/users/2064df32e732cb672d58c8e0b97c5845/mobaz.jpg",
        friend:false
    }
]

interface TypeDataLogged {
  id: number;
  pictureURL: string;
  nickname: string;
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

export function getDataUsers() {
  axios
    .get(`http://localhost:3000/users`, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "localhost:3000" },
    })
    .then((res) => {
      console.log(res);
    })
    .catch();
}

export function getOneUser() {
  axios
    .get(
      `http://localhost:3000/users/${"cacaff51-c8b7-4e52-920c-133ddfcc7422"}`,
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