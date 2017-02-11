import StandardCard from "./StandardCard";
import Deck from "./Deck";
import {CardSuit} from "./CardColor";
import {PartialImage} from "../entities/PartialImage";



export class StandardDeck extends Deck {
    constructor() {
        super();
        super.setDeckImage( new PartialImage("img/cardBack.png", 0, 0, 73, 98));
        for (let _jCardColor = 0; _jCardColor < 4; _jCardColor++) {
             for (let _iCardValue = 0; _iCardValue < 13; _iCardValue++) {
                 let card = new StandardCard(CardSuit[_jCardColor], _iCardValue.toString(), "c");
                 card.showFrontImage();
                 this.cards.push(card);
             }
        }
    }

     public showAllCards = (): void => {
            this.cards.forEach(element => {
                console.log(element);
            });
    }


}

