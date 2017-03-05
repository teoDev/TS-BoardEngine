import {Player} from './Player';
import Card from "../entities/Card";
import { CardSpace } from "./CardSpace";
import {GameElement} from "./GameElement";
import {Drawable} from "../interfaces/Drawable";

export abstract class Deck extends GameElement implements Drawable  {
    public cards:  Card[]  = Array<Card>();
    public showAllCards: () => void;
    public cardSpace: CardSpace;

    public getRandomCard = (): Card => {
        // TODO:should be move to service
        const rand = Math.floor(Math.random() * this.cards.length);
        const card: Card = this.cards[rand];
        this.addCardToCardSpace(card);
        this.removeCardFromDeck(rand);
        return card;
     }

     public removeCardFromDeck(cardIndex){
        this.cards.splice(cardIndex, 1);
     }

     public addCardToCardSpace(card: Card) {
        this.cardSpace.addCard(card);
     }

     public shuffle = (): void => {
         // TODO: Implement
            this.cards.forEach((element) => {
                console.log(element);
            });
     }
     public assignCardSpace(cardSpace: CardSpace) {
         this.cardSpace = cardSpace;
     }


      public assignToPlayer(player: Player) {
        super.assignToPlayer(player);
        this.cards.forEach((card: Card) => {
                card.assignToPlayer(player);
        });
    }
}
export default Deck;
