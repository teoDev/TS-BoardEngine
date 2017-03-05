import {Board} from "./board";


export class StandardCardBoard extends Board {
    public view;

    constructor(width: number, height: number) {
        super(width, height);
        this.imgSRC = "img/board.png";
    }

    public getView() {
        return this.view;
       //  return React.createElement(BoardView, {text: "a"});
    }
}

