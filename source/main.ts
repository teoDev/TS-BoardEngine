import * as $ from "jquery";
import { WarGame } from "./example_games/WarGame/WarGame";
import { Player } from "./entities/Player";
import { WarGameView } from "./example_games/WarGame/View/WarGamView";

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
 io.emit("initGame", {});
 joinGame(io);

 io.on("initGame", function (data) {
   console.log("Data from server:", data.game);
   // let warGameController = new WarGameController(data.game as WarGame);
   let warGameView = new WarGameView(data.game as WarGame, io);

   warGameView.initRender();
  });
});


function joinGame(socket) {
  if (socket !== undefined) {
    const player = new Player("zosia");
    player.name = "tolek";
    socket.emit("joinGame", player, 1);
  }
}




