import {Board} from "./board";
import {BoardView} from "../templates/components/board";


export class StandardCardBoard extends Board {
    public view;

    constructor(width: number, height: number) {
        super(width, height);
        this.view =  BoardView as React.ComponentClass<any>;
    }

    public getView() {
        return this.view;
       //  return React.createElement(BoardView, {text: "a"});
    }
}

