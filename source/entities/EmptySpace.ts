import { GameElement } from "./GameElement";

export  class EmptySpace extends GameElement {

   public posX: number;
   public posY: number;

   public elements:  GameElement[];

   constructor() {
       super();
       this.elements = [];
   }

   public empty() {
       this.elements = [];
   }

   public addElement(element: GameElement){
       element.setPosition(this.posX + 15, this.posY + 15);
       this.elements.push(element);
   }

}

