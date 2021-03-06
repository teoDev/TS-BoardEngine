import {StandardCard} from "./StandardCard";
import {Deck} from "./Deck";
import {CardSuit} from "./CardColor";

export class StandardDeck extends Deck {
    constructor() {
        super();
        for (let _jCardColor = 0; _jCardColor < 4; _jCardColor++) {
             for (let _iCardValue = 2; _iCardValue <= 14; _iCardValue++) {
                 const card = new StandardCard(CardSuit[_jCardColor], _iCardValue, "c");
                 this.cards.push(card);
             }
        }
    }

}

