import {Drawable} from "../interfaces/Drawable";
import { GameElement } from "./GameElement";

 export abstract class Board extends GameElement implements Drawable {
   public imgSRC;
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
      super();
      this.width = width;
      this.height = height;
    }


}
