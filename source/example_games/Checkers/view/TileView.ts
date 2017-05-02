import { GameElementView } from '../../../view/GameElementView';
import { Tile } from "../entities/Tile";

export class TileView extends GameElementView {

    constructor(model: Tile) {
        super(model);
        this.imgSRC = "img/white_tile.png";
        this.scaleX = 0.8;
        this.scaleY = 0.8;
    }

}

