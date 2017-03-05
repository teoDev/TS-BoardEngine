import {Drawable} from "../interfaces/Drawable";
import { GameElement } from "./GameElement";

export  class EmptySpace extends GameElement implements Drawable {

   public posX: number;
   public posY: number;

   public elements:  GameElement[]  = [];

   constructor() {
       super();
       this.imgSRC = "img/cardSpot.png";
       this.scaleX = 1.3;
       this.scaleY = 1.2;
   }

   public empty() {
       this.elements = [];
   }

   public addElement(element: GameElement){
       element.setPosition(this.posX + 15, this.posY + 15);
       this.elements.push(element);
   }

}

export default EmptySpace;
