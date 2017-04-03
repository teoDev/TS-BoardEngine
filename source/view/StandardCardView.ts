import {Card} from '../entities/card';
import {CardView} from './CardView';
export class StandardCardView extends CardView  {

    public rank: number;

    constructor(model: Card) {
        super(model);
        this.imgSRC = "img/cards/" + model.type + "_" +  model.value + ".png";
        this.draggable = true;
    }

}

