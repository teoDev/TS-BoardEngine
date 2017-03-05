import {Drawable} from "../interfaces/Drawable";
import { GameElement } from "./GameElement";

export abstract class Card extends GameElement implements Drawable {

   public posX: number;
   public posY: number;
   public frontImage;
   public backImage;

   // actualImage
   public imgSRC;

   private type: string;
   private value: number;
   private message: string;

   constructor($type: string, $value: number, $message: string) {
       super();
       this.type = $type;
       this.value = $value;
       this.message = $message;
       this.frontImage =  this.imgSRC;
   }

    public setFrontImage(image): void {
         this.frontImage =  image;
    }

    public showFrontImage(): void {
         this.imgSRC =  this.frontImage;
    }

     public setBackImage(image): void {
         this.backImage =  image;
    }
    public showBackImage(): void {
         this.imgSRC =  this.backImage;
    }

    public getValue(): number {
         return this.value;
    }

}

export default Card;
