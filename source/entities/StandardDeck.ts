import StandardCard from "./StandardCard";
import Card from "./Card";
import Deck from "./Deck";
import {PartialImage} from "./PartialImage";
import {CardSuit} from "./CardColor";


class StandardDeck extends Deck {
     public cards:  Array<Card> = [];

    constructor() {
        super();
        for (let _jCardColor = 0; _jCardColor < 4; _jCardColor++) {
             for (let _iCardValue = 0; _iCardValue < 13; _iCardValue++) {
                 let card = new StandardCard(CardSuit[_jCardColor], _iCardValue.toString(), "c");
                 card.image = new PartialImage("img/cards.png", _iCardValue, _jCardColor, 73, 98);
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

export default StandardDeck;
