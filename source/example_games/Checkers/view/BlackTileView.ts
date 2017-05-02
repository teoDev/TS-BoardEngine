import {TileView} from './TileView';
import { Tile } from "../entities/Tile";

export class BlackTileView extends TileView {

    constructor(model: Tile) {
        super(model);
        this.imgSRC = "img/black_tile.png";
    }

}

