import { Injectable } from "@nestjs/common";
import { Socket } from "socket.io";

@Injectable()
export class GameService{
    private players : Socket[] = [];

    addToQueue(player: Socket):void {
        console.log("hello from GameService");
    }
}