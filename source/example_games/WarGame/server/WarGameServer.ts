import {WarGameController} from '../controller/WarGameController';
import {WarGame} from '../WarGame';
import { GameServer } from "../../../server/GameServer";
import { GameRoom } from "../../../server/GameRoom";

export class WarGameServer extends GameServer{


  public initGame(gameRoom:GameRoom ) {
   console.log("INIT GAME: WARGAME");
   const checkersGame = new WarGame(gameRoom.players);
   const checkerGameController = new WarGameController(checkersGame, gameRoom.sockets); //pass room socket

   for (const client of gameRoom.sockets) {
            client.in("room_" + gameRoom.roomID).emit("initGame", {game: checkersGame});
    }
   checkerGameController.start();
  }

}

// tslint:disable-next-line:no-unused-new
new WarGameServer();
