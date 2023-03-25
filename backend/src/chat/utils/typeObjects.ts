import internal from "stream"

export interface typeobject{
    type: string
    message: string
  }

  export interface objectChannel{
    type: string
    message: string
    picture: string
  }

  export  interface converssession_channel{
    login: string
    message: string
    picture: string
  }
  export interface typeObject{
    id:string
    username:string
    status: string
    latestMessage: string | undefined
    picture: string
    conversation:typeobject[] ;
  }

  export interface chanel {
    id: string,
    name: string,
    members: number,
    latestMessage: string
    role: string,
    type: string,
    conversation: converssession_channel[]
  }

  export interface userchanel {
    id: string
    username:string
    status: string
    pictureLink: string
    role: string
  }

  export interface Searchchanel {
    name:string
    type: string
    join: string
  }

  export interface chanelprotected {
    id: string,
    name: string,
    members: number,
    latestMessage: string
    role: string,
    type: string,
    conversation: objectChannel[]
    status: string
  }
