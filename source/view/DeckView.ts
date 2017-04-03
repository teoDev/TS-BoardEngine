import {Deck} from '../entities/Deck';
import { GameElementView } from "./GameElementView";

export abstract class DeckView extends GameElementView  {

    public model: Deck;

    constructor(model: Deck){
        super(model);
        this.model = model;
    }


}
export default DeckView;
