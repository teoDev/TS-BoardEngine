import * as $ from "jquery";
import { Player } from "./entities/Player";
import { BoardView } from "./templates/components/board";

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as socketIo from "socket.io-client";

class SocketService {
     private _socket;
     private SERVER_URL = "http://localhost:8080";

     public getSocket() {
      if (this._socket === undefined) {
        this.initSocket();
      }
      return this._socket;
    }

    private initSocket(): void {
        this._socket = socketIo(this.SERVER_URL);
    }

}


const socketService = new SocketService();
const io = socketService.getSocket();

function gameLoop() {
   requestAnimationFrame(gameLoop);
}

$( document ).ready(function() {
// canvas =  $("#myCanvas").get(0) as HTMLCanvasElement;
 //ctx = canvas.getContext("2d");
// gameLoop();
 //let board = new Board(500, 500, ctx);
// let deck = new StandardDeck();
 //board.draw(deck.getRandomCard(), 15, 15);
 //board.draw(deck, 100, 100);

 ReactDOM.render(
        <BoardView text="sada"/>
        ,
    document.getElementById("board"),
);


 $("#getCard").click(function () {
     joinGame(io);
  });
});

function joinGame(socket) {
  if (socket !== undefined) {
    const player = new Player();
    player.name = "tolek";
    socket.emit("joinGame", player, 1);
  }
}




