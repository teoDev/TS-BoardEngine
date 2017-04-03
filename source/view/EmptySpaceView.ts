import { GameElementView } from "./GameElementView";
import { EmptySpace } from "./../entities/EmptySpace";

export  class EmptySpaceView extends GameElementView {

   public posX: number;
   public posY: number;
   constructor(model: EmptySpace) {
       super(model);
       this.imgSRC = "img/cardSpot.png";
       this.scaleX = 1.3;
       this.scaleY = 1.2;
   }

}

