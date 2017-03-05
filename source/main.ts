import * as $ from "jquery";
import { Player } from "./entities/Player";
import { WarGame } from "./example_games/WarGame/WarGame";

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


$( document ).ready(function() {
 const warGame = new WarGame([new Player("tolek"), new Player("bolek")]);
 warGame.socket = io;
 warGame.start();
 joinGame(io);
 warGame.initGame();
});


function joinGame(socket) {
  if (socket !== undefined) {
    const player = new Player("zosia");
    player.name = "tolek";
    socket.emit("joinGame", player, 1);
  }
}




