import { WhiteTileView } from "./WhiteTileView";
import {BoardView} from '../../../view/BoardView';
import { CheckersBoard } from '../entities/CheckersBoard';
import { BlackTileView } from "./BlackTileView";

export class CheckersBoardView extends BoardView {

    constructor(model: CheckersBoard, width: number, height: number) {
        super(model, width, height);
        this.scaleX = 1.3;
        this.scaleY = 1.3;
        model.whiteTiles.forEach((whiteTile) => {
             whiteTile.posX = whiteTile.xAxis*78; //156 size of 2 tiles
             whiteTile.posY = whiteTile.yAxis*78; //156 size of 2 tiles
             this.viewElements.push(new WhiteTileView(whiteTile));
       });
        model.blackTiles.forEach((blackTile) => {
             blackTile.posX = blackTile.xAxis*78; //156 size of 2 tiles
             blackTile.posY = blackTile.yAxis*78; //156 size of 2 tiles
             this.viewElements.push(new BlackTileView(blackTile));
       });
    }

}

