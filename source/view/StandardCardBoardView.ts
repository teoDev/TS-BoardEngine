import {BoardView} from './BoardView';
import { StandardCardBoard } from "./../entities/standardCardBoard";

export class StandardCardBoardView extends BoardView {

    constructor(model: StandardCardBoard, width: number, height: number) {
        super(model, width, height);
        this.imgSRC = "img/board.png";
    }

}

