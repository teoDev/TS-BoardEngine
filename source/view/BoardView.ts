import {Board} from "../entities/board";
import {GameElementView} from "./GameElementView";

 export  class BoardView extends GameElementView {
    public imgSRC;
    public viewElements : GameElementView[] = [];
    private width: number;
    private height: number;

    constructor(model: Board, width: number, height: number) {
      super(model);
      this.width = width;
      this.height = height;
    }


}
