import {Card} from '../entities/card';
import {Player} from '../entities/Player';
import {CardSpace} from '../entities/CardSpace';
import {Deck} from '../entities/Deck';
import { GameElementController } from "./GameElementController";

export  class DeckController extends GameElementController  {
    public showAllCards: () => void;
    public model: Deck;


    public getRandomCard = (): Card => {
        // TODO:should be move to service
        const rand = Math.floor(Math.random() * this.model.cards.length);
        const card: Card = this.model.cards[rand];
        this.removeCardFromDeck(rand);
        return card;
     }

     public removeCardFromDeck(cardIndex){
        this.model.cards.splice(cardIndex, 1);
     }

     public addCardToCardSpace(card: Card) {
        this.model.cardSpace.addCard(card);
     }

     public shuffle = (): void => {
         // TODO: Implement
            this.model.cards.forEach((element) => {
                console.log(element);
            });
     }
     public assignCardSpace(cardSpace: CardSpace) {
         this.model.cardSpace = cardSpace;
     }


      public assignToPlayer(player: Player) {
        super.assignToPlayer(player);
        this.model.cards.forEach((card: Card) => {
                card.player = player;
        });
    }
}
