import { GameElement } from "./GameElement";

export abstract class Card extends GameElement {

   public posX: number;
   public posY: number;

   public type: string;
   public value: number;
   public message: string;

   constructor($type: string, $value: number, $message: string) {
       super();
       this.type = $type;
       this.value = $value;
       this.message = $message;
   }

    public getValue(): number {
         return this.value;
    }

}

