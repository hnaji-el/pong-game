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


export const dataChannel = [
    {
        "id":1,
        "name": "channel 01",
        "picture": "https://static.vecteezy.com/system/resources/previews/006/988/723/original/boy-playing-game-gamer-logo-free-vector.jpg",
        "members" : "10",
        "latestMessage": "welcome to your channel",
        "role":"owner",
        "conversation":[
            {
                "type":"member",
                "message": "hey 😃",
                "time":"10:00",
                "picture":"https://cdn.intra.42.fr/users/2cc53519ab737304bcdd74e4125c3e61/mouassit.jpg"
            },
            {
                "type": "user",
                "message": "welcome to your channel",
                "time": "10:45"
            },
        ]
    },

    {
        "id":2,
        "name": "channel 02",
        "picture": "https://cdna.artstation.com/p/assets/images/images/023/459/708/large/vaibhav-verma-game-logo.jpg?1579270067",
        "members" : "10",
        "latestMessage": "welcome to your channel",
        "role":"admin",
        "conversation":[
            {
                "type":"member",
                "message": "hey 😃",
                "time":"10:00",
                "picture":"https://cdn.intra.42.fr/users/2cc53519ab737304bcdd74e4125c3e61/mouassit.jpg"
            },
            {
                "type": "user",
                "message": "welcome to your channel",
                "time": "10:45"
            },
        ]
    },

    {
        "id":3,
        "name": "channel 03",
        "picture": "https://img.freepik.com/premium-vector/ghost-logo-design-vector-with-modern-illustration-concept-style-badge-emblem_722324-149.jpg?w=360",
        "members" : "1",
        "latestMessage": "welcome to your channel",
        "role":"member",
        "conversation":[
            {
                "type":"member",
                "message": "hey 😃",
                "time":"10:00",
                "picture":"https://cdn.intra.42.fr/users/2cc53519ab737304bcdd74e4125c3e61/mouassit.jpg"
            },
            {
                "type": "user",
                "message": "welcome to your channel",
                "time": "10:45"
            },
        ]
    },
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
      }).catch()
}

export  function getDmUsers(getRes:any){
   axios.get("http://localhost:3000/chat/DM-with-all-users", {
      withCredentials: true,
        headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
  }).then((res) => {
      getRes(res.data)
      }).catch()
}


export function getAllChannels(getRes:any){
  axios.get("http://localhost:3000/chat/room-message", {
      withCredentials: true,
        headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
  }).then((res: any) => {
        getRes(res.data)
      }).catch()
}

export function getChannelsDm(){
  axios.get("http://localhost:3000/chat/room-message", {
      withCredentials: true,
        headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
  }).then((res) => {
      
      }).catch()
}

export async function CreateChannel(getRes:any,data:any) {
    await axios.post("http://localhost:3000/chat/create-room", { data }, { withCredentials: true }).then((res) => {
        getRes(res)
    }).catch((error) => {
      getRes("error")
  })
}

export function getFriendChannel(getRes:any,nameChannel:string){

    axios.get(`http://localhost:3000/chat/friends-in-room/${nameChannel}`, {
        withCredentials: true,
          headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
        }).then((res)=>{
            getRes(res.data) 
        }).catch()
}
  
export function getMembersChannel(getRes:any,nameChannel:string){

    axios.get(`http://localhost:3000/chat/users-in-room/${nameChannel}`, {
        withCredentials: true,
          headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
        }).then((res)=>{
            getRes(res.data) 
        }).catch()
}
  
export async function addToRoom(data:any){

    await axios.post("http://localhost:3000/chat/add-to-room",{data},{withCredentials: true}).then().catch()
}
  

export async function setAdmin(data: any) {
    await axios.post("http://localhost:3000/chat/set-admin",{data},{withCredentials: true}).then().catch()
}
  
export async function setBlock(data:any){
   await axios.patch("http://localhost:3000/chat/ban",{data},{withCredentials: true}).then().catch()
}
  
export async function setKick(data:any){
   await axios.patch("http://localhost:3000/chat/kick",{data},{withCredentials: true}).then().catch()
}
  
export async function setMute(data:any){
   await axios.patch("http://localhost:3000/chat/muted",{data},{withCredentials: true}).then().catch()
}
  
export async function leaveRoom(name:string){
   await axios.post("http://localhost:3000/chat/quite-room",{name},{withCredentials: true}).then().catch()
  }
  
export async function deleteRoom(name: string) {
  await  axios.delete(`http://localhost:3000/chat/delete-room/${name}`,{withCredentials: true}).then().catch()
  }