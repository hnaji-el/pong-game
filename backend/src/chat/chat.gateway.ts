import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
 } from '@nestjs/websockets';
 import { Socket, Server } from 'socket.io';
 import { PrismaService } from "src/prisma/prisma.service";
 import { ChatService } from "./chat.service"; 
 import * as moment from 'moment';
 import * as cookie from 'cookie';

@WebSocketGateway(1337,{
   cors: {
     origin: "http://localhost:3001",
     credentials: true,
     allowedHeaders : ["Cookie"]
   },
 })
 export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
 constructor(private prisma: PrismaService, private roomservice: ChatService) {}
  @WebSocketServer() server: Server;
  OnlineUser: any[] = [];
  id : number = 0;

  @SubscribeMessage('msgServer')
  async handleMessage(@MessageBody() Body, @ConnectedSocket() client: any) {
  const user1 = client.user;
    this.id += 1;
  console.log("msgServer, Body => ", Body);
  
  let roomName = `<${client.user.nickname }_${this.id}>`
    if (Body.type.toString() == 'DM')
    {
      const user_freind = await this.prisma.user.findUnique({
        where: {
            nickname: Body.name
        }
    });
      for (let index = 0; index < this.OnlineUser.length; index++)
      {
        if (this.OnlineUser[index].user.nickname == user_freind.nickname || this.OnlineUser[index].user.nickname == user1.nickname)
        {
          this.OnlineUser[index].join(roomName);
        }
      }
      const room = await this.prisma.room.findUnique({
        where: {
          name: (user_freind.nickname + user1.nickname)
        }
      })
      if (room)
      {        
        console.log("room -----");
        
        await this.prisma.messages.create({
          data: {
              roomName: (user_freind.nickname + user1.nickname),
              data: Body.data,
              userLogin: user_freind.nickname
          }
        })
        this.server.to(roomName).emit("msgFromServer", await this.roomservice.emit_message(user1, room));
        for (let index = 0; index < this.OnlineUser.length; index++)
        {
          if (this.OnlineUser[index].user.nickname == user1.nickname)
          {
            client.emit("msgFromServer", await this.roomservice.emit_message(user_freind, room));
          }
        }
      }
      else
      {
        console.log("else condition");

        const room_freind = await this.prisma.room.findUnique({
          where: {
            name: (user1.nickname + user_freind.nickname)
          }
        })
        if (room_freind)
        {
          console.log("i was here room_friend");
          
          const msg = await this.prisma.messages.create({
            data: {
                roomName: (user1.nickname + user_freind.nickname),
                data: Body.data,
                userLogin: user_freind.nickname
              }
          })
          this.server.to(roomName).emit("msgFromServer", await this.roomservice.emit_message(user1, room_freind));
          for (let index = 0; index < this.OnlineUser.length; index++)
          {
            if (this.OnlineUser[index].user.nickname == user1.nickname)
            {
              client.emit("msgFromServer", await this.roomservice.emit_message(user_freind, room_freind));
            }
          }
        }
        else
          return ;
      }
    }
    else
    {
      const rom = await this.prisma.room.findUnique({
        where: {
          name: Body.name
          }
        })
        const user2 = await this.prisma.muted.findMany({
          where: {
            userLogin: user1.nickname,
            roomName: Body.name
            }
          })
        if (user2[0])
        {
            if (user2[0].time < moment().format('YYYY-MM-DD hh:mm:ss'))
            {
              this.roomservice.unmuted(user1, Body);
            }
            else return;
        }
      if (rom)
      {
        for (let i = 0; i < this.OnlineUser.length; i++)
        {
          const login = rom.members.find((login) => login==this.OnlineUser[i].user.nickname);
          if (login)
            this.OnlineUser[i].join(roomName);
        }
        const msg = await this.prisma.messages.create({
          data: {
            roomName: Body.name,
            data: Body.data,
            userLogin: user1.nickname
          }
          })
          this.server.to(roomName).emit("msgFromServer",await this.roomservice.emit_messagetoRoom(user1, rom));
      }
    }
  }
 
 async handleDisconnect(@ConnectedSocket() client: any){
  for (let index = 0; index < this.OnlineUser.length; index++)
    {
      if (this.OnlineUser[index].id == client.id)
      {
        this.OnlineUser.splice(index, 1);
        break;
      }
    }
  const cookies :{ [key: string]: string } = cookie.parse(client.handshake.headers.cookie || "");
  if (!cookies['accessToken'])
  {
    client.emit('error', 'unauthorized');
    return;
  }
  const jwttoken : string= cookies['accessToken'];
  if(!jwttoken)
  {
    client.emit('error', 'unauthorized');
    return;
  }
  try {
    const user = await this.roomservice.getUserFromAuthenticationToken(jwttoken); 
    const test = this.OnlineUser.find((client) => client.user.login === user.nickname);
    if (!test)
    {
       await this.prisma.user.update({
       where: {
         nickname: client.user.nickname
       },
       data: {
         status: "of"
       }
     })
    }
  } catch (error) {
    client.emit('error', 'unauthorized');
  }
}
 
   async handleConnection(@ConnectedSocket() client: any) {
   console.log("client connected to chat ", client.id);
   
   const cookies :{ [key: string]: string } = cookie.parse(client.handshake.headers.cookie || "");
   if (!cookies['jwt'])
   {
     client.emit('error', 'unauthorized');
     return;
    }
    const jwttoken : string= cookies['jwt'];
    if(!jwttoken)
    {
    client.emit('error', 'unauthorized');
    return;
  }
  try {
    const user = await this.roomservice.getUserFromAuthenticationToken(jwttoken);
    console.log("chat gateway => ",user.nickname);
    if (!user)
    {
      return;
    }
    client.user = user;
    if (user.status == "of")
    {
      const user1 = await this.prisma.user.update({
        where: {
          nickname: user.nickname
        },
        data: {
          status: "on"
        }
      })
    }
    this.OnlineUser.push(client);
  } catch (error) {
    client.emit('error', 'unauthorized');
    client.disconnect();
  }
}
}