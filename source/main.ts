import {WarGame} from './example_games/WarGame/WarGame';
import {WarGameView} from './example_games/WarGame/View/WarGamView';
import * as $ from "jquery";
import { SocketService } from "./utils/SocketService";

const socketService = new SocketService();
const io = socketService.getSocket();
let player;

function joinGame(socket) {
  if (socket !== undefined) {
    socket.emit("joinGame", "player");
  }

}


$( document ).ready(() => {
 joinGame(io);
 io.on("joinGame$Respond",  (playerFromServ) => {
   player = playerFromServ;
  });
 io.on("initGame",  (data) => {
   console.log("Data from server:", data.game, " Player:", player);
   const gameView = new WarGameView(data.game as WarGame, io);
   gameView.model.player = player;
   gameView.initRender();
  });
});






