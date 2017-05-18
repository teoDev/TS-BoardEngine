import { Checker } from "./../entities/Checker";
import { CheckersGame } from "./../CheckersGame";
import { GameController } from "./../../../controller/GameController";

export class CheckersGameController extends GameController {


    public sockets= [];


   constructor(model: CheckersGame, sockets) {
       super(model);

       this.addGameElements(model.player_1_checkers);
       this.addGameElements(model.player_2_checkers);

       this.sockets = sockets;

       for (const client of this.sockets) {
           client.on("moveChecker$Request",  (player, checkerHash,targetCol,targetRow) => {
               console.log("reacting for MOVE CHECKER POSITION");
               const checker: Checker =  this.getGameElementByHash(checkerHash) as Checker;
               console.log("CH:",this.setPositionByAxis);
               this.setPositionByAxis(checker,targetCol,targetRow);
               for (const client of this.sockets) {
                            client.emit("moveChecker$Response", checker );
                }
             });
        }

  };

   public updatePositionBasedOnAxis(checker:Checker){
         checker.posX = checker.xAxis * 78;
         checker.posY = checker.yAxis * 78;
    }

     public setPositionByAxis(checker:Checker, xAxis: number, yAxis: number) {
        checker.xAxis = xAxis;
        checker.yAxis = yAxis;
        this.updatePositionBasedOnAxis(checker);
    }

}
