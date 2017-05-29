import {SocketService} from '../../utils/SocketService';
import {CheckersGame} from './CheckersGame';
import {CheckersGameView} from './view/CheckersGameView';

import * as $ from "jquery";


const socketService = new SocketService("192.168.43.241", "8080");
const io = socketService.getSocket();
let player;

function joinGame(socket) {
  if (socket !== undefined) {
    socket.emit("joinGame", "player", sessionStorage.getItem("gameToken"));
  }
}

$( document ).ready(() => {
 joinGame(io);
 io.on("joinGame$Respond",  (playerFromServ) => {
   player = playerFromServ;
  });
 io.on("initGame",  (data) => {
   console.log("Data from server:", data.game, " Player:", player, " gameToken:",data.gameToken);
   sessionStorage.setItem("gameToken", data.gameToken);
   const gameView = new CheckersGameView(data.game as CheckersGame, io);
   gameView.model.player = player;
   gameView.initRender();
  });
});






