import {CollectSpace} from '../../../entities/CollectSpace';
import { Checker } from "./../entities/Checker";
import { CheckersGame } from "./../CheckersGame";
import {Card} from '../../../entities/card';
import { GameController } from "./../../../controller/GameController";

export class CheckersGameController extends GameController {


    public sockets= [];


   constructor(model: CheckersGame, socket) {
       super(model);


       this.sockets = socket;
       this.model.cardsINturn = [] ;


       for (const client of this.sockets) {
           client.on("updateCheckerPosition$Request",  (player, checkerHash,targetCol,targetRow) => { // data = deck
               console.log("reacting for UPDATE CHECKER POSITION");
               const checker: Checker =  this.getGameElementByHash(checkerHash) as Checker;
               checker.xAxis = targetCol;
               checker.yAxis = targetRow;
       });
        }

  };

    public collectCardsForWinner(winCard: Card) {
                console.log("winner: ", winCard.player);
                let collectSpace: CollectSpace;
                collectSpace = this.getElementsAssignedToPlayerByType(winCard.player, CollectSpace.name).pop() as CollectSpace;

                for (const cardToCollect of this.model.cardsINturn) {
                        cardToCollect.setPosition( collectSpace.posX + 100,  collectSpace.posY);
                        for (const client of this.sockets) {
                            client.emit("updateCardPosition$Request", cardToCollect );
                         }
                        // cardToCollect.img.rotation = Math.floor(Math.random() * 360) + 1;
                        //cardToCollect.updateView();
                        this.model.cardsINturn = [];
                }
        };

   // returns cards with higher value
   public compareCards(): Card[] {
        const card1: Card = this.model.cardsINturn[this.model.cardsINturn.length - 1];
        const card2: Card = this.model.cardsINturn[this.model.cardsINturn.length - 2];
        if (card1.getValue() === card2.getValue()) {
             return [card1, card2];
        }else if (card1.getValue() > card2.getValue()) {
            return [card1];
        }else if (card1.getValue() < card2.getValue()) {
            return [card2];
        }
   }
}
