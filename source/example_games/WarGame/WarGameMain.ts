import {WarGame} from './WarGame';
import {WarGameView} from './View/WarGameView';
import {SocketService} from '../../utils/SocketService';
import * as $ from "jquery";


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






