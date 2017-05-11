import { GameElementView } from '../../../view/GameElementView';
import { Checker } from "./../entities/Checker";

export class CheckerView extends GameElementView {

    constructor(model: Checker) {
        super(model);
        this.imgSRC = "img/white_tile.png";
        this.scaleX = 0.8;
        this.scaleY = 0.8;
        this.draggable = true;
    }

}

