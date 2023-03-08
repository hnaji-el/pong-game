import { Injectable } from "@nestjs/common";
import { Socket } from "socket.io";

@Injectable()
export class GameService{
    private players : Socket[] = [];

    addToQueue(player: Socket):void {
        console.log("hello from GameService");
        this.players.push(player);
        if (this.players.length >= 2){
            const player1 = this.players.shift();
            const player2 = this.players.shift();
            if (player1 && player2){
                player1.emit('launchGame');
                player2.emit('launchGame');
            }
        }
        else{
            player.emit('waitingInQueue');
        }
    }
}