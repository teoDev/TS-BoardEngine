// import {WarGame} from './example_games/WarGame/WarGame';
import { CheckersGame } from "./example_games/Checkers/CheckersGame";
import { CheckersGameView } from "./example_games/Checkers/view/CheckersGameView";
import { GameView } from "./view/GameView";
// import {WarGameView} from './example_games/WarGame/View/WarGamView';
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
   let gameView: GameView;
   // gameView = new WarGameView(data.game as WarGame, io);
   gameView = new CheckersGameView(data.game as CheckersGame, io);
   gameView.model.player = player;
   gameView.initRender();
  });
});






