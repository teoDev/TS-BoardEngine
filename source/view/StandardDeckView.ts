import {StandardDeck} from '../entities/StandardDeck';
import {DeckView} from './DeckView';



export class StandardDeckView extends DeckView {
    constructor(model: StandardDeck) {
        super(model);
        this.imgSRC = "img/cardBack.png";
    }

}

