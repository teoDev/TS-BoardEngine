import {CollectSpace} from '../../../entities/CollectSpace';
import {Deck} from '../../../entities/Deck';
import {Card} from '../../../entities/card';
import { GameElementController } from "./../../../controller/GameElementController";
import {WarGame} from '../WarGame';
import { DeckController } from "./../../../controller/DeckController";
import { GameController } from "./../../../controller/GameController";

export class WarGameController extends GameController {

    public deckController: DeckController;
    public deck2Controller: DeckController;

    public player1CollectSpaceController: GameElementController;
    public player2CollectSpaceController: GameElementController;


   constructor(model: WarGame, socket) {
       super(model);

       this.addGameElement(model.cardSpot);
       this.addGameElement(model.cardSpot_2);
       this.addGameElement(model.deck_1);
       this.addGameElement(model.deck_2);
       this.addGameElement(model.player1CollectSpace);
       this.addGameElement(model.player2CollectSpace);

       this.socket = socket;
       this.model.cardsINturn = [] ;
       this.deckController = new DeckController(model.deck_1);
       this.deck2Controller = new DeckController(model.deck_2);
       this.deckController.assignCardSpace(model.cardSpot);
       this.deck2Controller.assignCardSpace(model.cardSpot_2);

       this.player1CollectSpaceController = new GameElementController(model.player1CollectSpace);
       this.player2CollectSpaceController = new GameElementController(model.player2CollectSpace);

       this.assignElementToPlayer(model.deck_1, model.player_1);
       this.assignElementToPlayer(model.player1CollectSpace, model.player_1);
       this.assignElementToPlayer(model.deck_2, model.player_2);
       this.assignElementToPlayer(model.player2CollectSpace, model.player_2);

       this.socket.on("getRandomCard$Request",  (deckHash) => { // data = deck
           const deck: Deck =  this.getGameElementByHash(deckHash) as Deck;
           const card: Card = this.deckController.getRandomCard();
           this.assignElementToPlayer(card, deck.player); // assign card to player
           card.posX  = deck.cardSpace.posX;
           card.posY  = deck.cardSpace.posY;
           this.model.cardsINturn.push(card);
           this.socket.emit("getRandomCard$Response", card );
           if (this.deckController.model.cards.length === 0) {
                   //  that.removeElement(deckView);
            }
           if (this.model.cardsINturn.length % 2 === 0) {
                   const winningCards = this.compareCards();
                   if (winningCards.length === 1) {
                       this.collectCardsForWinner(winningCards[0]);
                    }
            }
       });
  };

    public collectCardsForWinner(winCard: Card) {
                console.log("winner: ", winCard.player);
                let collectSpace: CollectSpace;
                collectSpace = this.getElementsAssignedToPlayerByType(winCard.player, CollectSpace.name).pop() as CollectSpace;

                for (const cardToCollect of this.model.cardsINturn) {
                        cardToCollect.setPosition( collectSpace.posX + 100,  collectSpace.posY);
                        this.socket.emit("updateCardPosition$Request", cardToCollect );
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
