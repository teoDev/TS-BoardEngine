import {Card} from './card';
import { CardSpace } from "./CardSpace";
import {GameElement} from "./GameElement";

export abstract class Deck extends GameElement  {
    public cards:  Card[];
    public cardSpace: CardSpace;

    constructor(){
        super();
        this.cards = [];
    }

}
