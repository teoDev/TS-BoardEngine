import {Card} from '../../../entities/card';
import { GameElementController } from "./../../../controller/GameElementController";
import {WarGame} from '../WarGame';
import { DeckController } from "./../../../controller/DeckController";
import { GameController } from "./../../../controller/GameController";

export class WarGameController extends GameController {
    public model: WarGame;

    public deckController: DeckController;
    public deck2Controller: DeckController;

    public player1CollectSpaceController: GameElementController;
    public player2CollectSpaceController: GameElementController;


   constructor(model: WarGame, socket) {
       super(model);
       this.socket = socket;
       this.model.cardsINturn = [] ;
       this.deckController = new DeckController(this.model.deck_1);
       this.deck2Controller = new DeckController(this.model.deck_2);

       this.player1CollectSpaceController = new GameElementController(this.model.player1CollectSpace);
       this.player2CollectSpaceController = new GameElementController(this.model.player2CollectSpace);

       this.model.deck_1.player = this.model.player_1;
       this.deckController.assignCardSpace(this.model.cardSpot);

       this.model.deck_2.player = this.model.player_2;

       this.deck2Controller.assignCardSpace(this.model.cardSpot_2);


       // this.player1CollectSpaceController.assignToPlayer(this.model.player_1);
       // this.player2CollectSpaceController.assignToPlayer(this.model.player_2);
       const that = this;
       this.socket.on("getRandomCard$Request",  (data) => {
           console.log("getRandomCard");
           const card: Card = that.deckController.getRandomCard();
           that.model.cardsINturn.push(card);
           that.socket.emit("getRandomCard$Response", card );
           if (that.deckController.model.cards.length === 0) {
                   //  that.removeElement(deckView);
            }
           if (that.model.cardsINturn.length % 2 === 0) {
                   const winningCards = that.compareCards();
                   if (winningCards.length === 1) {
                       that.collectCardsForWinner(winningCards[0]);
                    }
            }
       });
  };

    public collectCardsForWinner(winCard: Card){
                for (const cardToCollect of this.model.cardsINturn) {
                        console.log(cardToCollect);
                        const collectSpace = this.model.player1CollectSpace;
                        cardToCollect.setPosition( collectSpace.posX + 100,  collectSpace.posY);
                        this.socket.emit("updateCardPosition$Request", cardToCollect );
                        // cardToCollect.img.rotation = Math.floor(Math.random() * 360) + 1;
                        // cardToCollect.updateView();
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
