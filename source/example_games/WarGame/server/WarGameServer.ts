import {GameController} from '../../../controller/GameController';
import {WarGameController} from '../controller/WarGameController';
import {WarGame} from '../WarGame';
import { GameServer } from "../../../server/GameServer";
import { GameRoom } from "../../../server/GameRoom";
import { Game } from "../../../entities/Game";

export class WarGameServer extends GameServer{

  public initGame(gameRoom: GameRoom ): Game {
   console.log("INIT GAME : CHECKERS");
   const gameModel =  new WarGame(gameRoom.players);
   return gameModel;
  }

  public initController(gameModel,sockets):GameController{
     return new WarGameController(gameModel, sockets); // pass room socket
  }


}

// tslint:disable-next-line:no-unused-new
new WarGameServer();
