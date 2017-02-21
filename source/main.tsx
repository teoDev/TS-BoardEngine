import * as $ from "jquery";
import * as React from "react";
import { Player } from "./entities/Player";
import { WarGame } from "./example_games/WarGame/WarGame";

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
 let game = new WarGame();
 let boardView =  game.board.getView();
 let element =  React.createElement(boardView, {});
 ReactDOM.render(
      element
        ,
    document.getElementById("board"),
);


 $("#getCard").click(function() {
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




