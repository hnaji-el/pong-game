import axios from "axios";




export const dataChat = [
  {
      "id":1,
      "username": "mustapha",
      "picture": "https://cdn.intra.42.fr/users/2cc53519ab737304bcdd74e4125c3e61/mouassit.jpg",
      "status" : "online",
      "latestMessage": "welcome my friend",
      "conversation":[
          {
              "type":"friend",
              "message": "hey 😃",
              "time":"10:00", 
          },
          {
              "type": "user",
              "message": "welcome my friend",
              "time": "10:45"
          },
          {
              "type":"friend",
              "message": "hey 😃",
              "time":"10:00", 
          },
          {
              "type": "user",
              "message": "welcome my friend",
              "time": "10:45"
          },            {
              "type":"friend",
              "message": "hey 😃",
              "time":"10:00", 
          },
          {
              "type": "user",
              "message": "welcome my friend",
              "time": "10:45"
          },            {
              "type":"friend",
              "message": "hey 😃",
              "time":"10:00", 
          },
          {
              "type": "user",
              "message": "welcome my friend",
              "time": "10:45"
          },            {
              "type":"friend",
              "message": "hey 😃",
              "time":"10:00", 
          },
          {
              "type": "user",
              "message": "welcome my friend",
              "time": "10:45"
          },            {
              "type":"friend",
              "message": "hey 😃",
              "time":"10:00", 
          },
          {
              "type": "user",
              "message": "welcome my friend",
              "time": "10:45"
          },            {
              "type":"friend",
              "message": "hey 😃",
              "time":"10:00", 
          },
          {
              "type": "user",
              "message": "welcome my friend",
              "time": "10:45"
          },
          {
              "type": "user",
              "message": "welcome my friend",
              "time": "10:45"
          },
          {
              "type": "friend",
              "message": "welcome my friend",
              "time": "10:45"
          },
          {
              "type": "friend",
              "message": "welcome my friend",
              "time": "10:45"
          },
          {
              "type": "friend",
              "message": "welcome my friend",
              "time": "10:45"
          },
          {
              "type": "friend",
              "message": "welcome my friend",
              "time": "10:45"
          },
          {
              "type": "friend",
              "message": "welcome my friend",
              "time": "10:45"
          },
          {
              "type": "friend",
              "message": "welcome my friend",
              "time": "10:45"
          },
          {
              "type": "friend",
              "message": "welcome my friend",
              "time": "10:45"
          },
          {
              "type": "friend",
              "message": "welcome my friend",
              "time": "10:45"
          },
          {
              "type": "friend",
              "message": "welcome my friend",
              "time": "10:45"
          },

      ]
  },
  {
      "id": 2,
      "username": "hamada",
      "picture": "https://cdn.intra.42.fr/users/ff6864ec8edf66b440972b6a3859f391/houbeid.jpg",
      "status" : "offline",
      "latestMessage": "ok nice",
      "conversation":[
          {
              "type":"friend",
              "message": "fenn asat hani",
              "time":"01:25", 
          },
          {
              "type": "user",
              "message": "fen a hamada m3ach la3bin",
              "time": "10:45"
          },
          {
              "type": "user",
              "message": "welcome my friend",
              "time": "10:45"
          },
          {
              "type": "friend",
              "message": "welcome my friend",
              "time": "10:45"
          },
          {
              "type": "friend",
              "message": "welcome my friend",
              "time": "10:45"
          },            {
              "type": "friend",
              "message": "welcome my friend",
              "time": "10:45"
          },            {
              "type": "friend",
              "message": "welcome my friend",
              "time": "10:45"
          },            {
              "type": "friend",
              "message": "welcome my friend",
              "time": "10:45"
          },            {
              "type": "friend",
              "message": "welcome my friend",
              "time": "10:45"
          },            {
              "type": "friend",
              "message": "welcome my friend",
              "time": "10:45"
          },            {
              "type": "friend",
              "message": "welcome my friend",
              "time": "10:45"
          },            {
              "type": "friend",
              "message": "welcome my friend",
              "time": "10:45"
          },            {
              "type": "friend",
              "message": "welcome my friend",
              "time": "10:45"
          },            {
              "type": "friend",
              "message": "welcome my friend",
              "time": "10:45"
          },            {
              "type": "friend",
              "message": "welcome my friend",
              "time": "10:45"
          },
      ]
  },
  {
      "id": 3,
      "username": "Nassim",
      "picture": "https://cdn.intra.42.fr/users/6d3534637f3c4cad95472c7bffaaa421/nabboudi.jpg",
      "status" : "online",
      "latestMessage": "I'm from morocco",
      "conversation":[
          {
              "type":"friend",
              "message": "hello from me",
              "time":"01:25", 
          },
          {
              "type": "user",
              "message": "welcome my friend",
              "time": "10:45"
          },
          {
              "type": "user",
              "message": "welcome my friend",
              "time": "10:45"
          },
          {
              "type": "friend",
              "message": "welcome my friend",
              "time": "10:45"
          },
      ]
  },

  {
      "id":4,
      "username": "Lamiaa",
      "picture": "https://cdn.intra.42.fr/users/52e4bf80ec0c61ea68ae59863d5b7fb5/laafilal.jpg",
      "status" : "offline",
      "latestMessage": "I'm fine",
      "conversation":[
          {
              "type":"friend",
              "message": "hello from Lamiaa",
              "time":"01:25", 
          },
          {
              "type": "user",
              "message": "welcome my friend",
              "time": "10:45"
          },
          {
              "type": "user",
              "message": "welcome my friend",
              "time": "10:45"
          },
          {
              "type": "friend",
              "message": "welcome my friend",
              "time": "10:45"
          },
      ]
  },
  {
      "id":4,
      "username": "Lamiaa",
      "picture": "https://cdn.intra.42.fr/users/52e4bf80ec0c61ea68ae59863d5b7fb5/laafilal.jpg",
      "status" : "offline",
      "latestMessage": "I'm fine",
      "conversation":[
          {
              "type":"friend",
              "message": "hello from Lamiaa",
              "time":"01:25", 
          },
          {
              "type": "user",
              "message": "welcome my friend",
              "time": "10:45"
          },
          {
              "type": "user",
              "message": "welcome my friend",
              "time": "10:45"
          },
          {
              "type": "friend",
              "message": "welcome my friend",
              "time": "10:45"
          },
      ]
  },
  {
      "id":4,
      "username": "Lamiaa",
      "picture": "https://cdn.intra.42.fr/users/52e4bf80ec0c61ea68ae59863d5b7fb5/laafilal.jpg",
      "status" : "offline",
      "latestMessage": "I'm fine",
      "conversation":[
          {
              "type":"friend",
              "message": "hello from Lamiaa",
              "time":"01:25", 
          },
          {
              "type": "user",
              "message": "welcome my friend",
              "time": "10:45"
          },
          {
              "type": "user",
              "message": "welcome my friend",
              "time": "10:45"
          },
          {
              "type": "friend",
              "message": "welcome my friend",
              "time": "10:45"
          },
      ]
  },
  {
      "id":4,
      "username": "Lamiaa",
      "picture": "https://cdn.intra.42.fr/users/52e4bf80ec0c61ea68ae59863d5b7fb5/laafilal.jpg",
      "status" : "offline",
      "latestMessage": "I'm fine",
      "conversation":[
          {
              "type":"friend",
              "message": "hello from Lamiaa",
              "time":"01:25", 
          },
          {
              "type": "user",
              "message": "welcome my friend",
              "time": "10:45"
          },
          {
              "type": "user",
              "message": "welcome my friend",
              "time": "10:45"
          },
          {
              "type": "friend",
              "message": "welcome my friend",
              "time": "10:45"
          },
      ]
  },
  {
      "id":4,
      "username": "Lamiaa",
      "picture": "https://cdn.intra.42.fr/users/52e4bf80ec0c61ea68ae59863d5b7fb5/laafilal.jpg",
      "status" : "offline",
      "latestMessage": "I'm fine",
      "conversation":[
          {
              "type":"friend",
              "message": "hello from Lamiaa",
              "time":"01:25", 
          },
          {
              "type": "user",
              "message": "welcome my friend",
              "time": "10:45"
          },
          {
              "type": "user",
              "message": "welcome my friend",
              "time": "10:45"
          },
          {
              "type": "friend",
              "message": "welcome my friend",
              "time": "10:45"
          },
      ]
  },
  {
      "id":4,
      "username": "Lamiaa",
      "picture": "https://cdn.intra.42.fr/users/52e4bf80ec0c61ea68ae59863d5b7fb5/laafilal.jpg",
      "status" : "offline",
      "latestMessage": "I'm fine",
      "conversation":[
          {
              "type":"friend",
              "message": "hello from Lamiaa",
              "time":"01:25", 
          },
          {
              "type": "user",
              "message": "welcome my friend",
              "time": "10:45"
          },
          {
              "type": "user",
              "message": "welcome my friend",
              "time": "10:45"
          },
          {
              "type": "friend",
              "message": "welcome my friend",
              "time": "10:45"
          },
      ]
  }
]





interface TypeDataLogged {
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

//------------------------ chat --------------------------------

export function getFriendChat(){
  axios.get("http://localhost:3000/chat/DM-with-all-users", {
      withCredentials: true,
        headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
  }).then((res: any) => {
        console.log(res);
        
      }).catch()
}

export function getDmUsers(){
  axios.get("http://localhost:3000/chat/DM", {
      withCredentials: true,
        headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
  }).then((res) => {
      }).catch()
}


export function getAllChannels(){
  axios.get("http://localhost:3000/chat/all-rooms", {
      withCredentials: true,
        headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
  }).then((res: any) => {
        
      }).catch()
}

export function getChannelsDm(){
  axios.get("http://localhost:3000/chat/room-message", {
      withCredentials: true,
        headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
  }).then((res) => {
      
      }).catch()
}

export function CreateChannel() {
  
  let data = {
    name: "channel01",
    type: "public",
    password:""
  }

  axios.post("http://localhost:3000/chat/create-room", { data }, { withCredentials: true }).then().catch((error) => {
  })
}