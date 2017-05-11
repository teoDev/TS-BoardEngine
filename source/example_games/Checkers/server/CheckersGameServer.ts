import {Game} from '../../../entities/Game';
import {GameController} from "../../../controller/GameController";
import {CheckersGame} from "../CheckersGame";
import {CheckersGameController} from "../controller/CheckersGameController";
import { GameServer } from "../../../server/GameServer";
import { GameRoom } from "../../../server/GameRoom";

export class CheckersGameServer extends GameServer{
  public initGame(gameRoom: GameRoom ):Game {
   console.log("INIT GAME : CHECKERS");
   const gameModel =  new CheckersGame(gameRoom.players);
   return gameModel;
  }

  public initController(gameModel,sockets):GameController{
     return new CheckersGameController(gameModel, sockets); // pass room socket
  }



  public addNotifier(){
     this.app.get("/" + "Checkers" + "/isUp", (req, res) => {
        res.json({up: "true"});

    });
  }


}

// tslint:disable-next-line:no-unused-new
new CheckersGameServer();
