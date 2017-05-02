import {TileView} from './TileView';
import { Tile } from "../entities/Tile";

export class WhiteTileView extends TileView {

    constructor(model: Tile) {
        super(model);
        this.imgSRC = "img/white_tile.png";
    }

}

