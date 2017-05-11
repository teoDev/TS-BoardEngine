import {CheckersGame} from '../CheckersGame';
import {CheckersGameController} from '../controller/CheckersGameController';
import { GameServer } from "../../../server/GameServer";
import { GameRoom } from "../../../server/GameRoom";

export class CheckersGameServer extends GameServer{


  public initGame(gameRoom: GameRoom ) {
   console.log("INIT GAME : CHECKERS");
   const checkersGame = new CheckersGame(gameRoom.players);
   const warGameController = new CheckersGameController(checkersGame, gameRoom.sockets); // pass room socket

   for (const client of gameRoom.sockets) {
            client.in("room_" + gameRoom.roomID).emit("initGame", {game: checkersGame});
    }
   warGameController.start();

  }

  public addNotifier(){
     this.app.get("/" + "Checkers" + "/isUp", (req, res)=>{
        res.json({"up": "true"});

    });
  }


}

// tslint:disable-next-line:no-unused-new
new CheckersGameServer();
