import {Drawable} from "../interfaces/Drawable";
import { GameElement } from "./GameElement";
import {PartialImage} from "../entities/PartialImage";

export abstract class Card extends GameElement implements Drawable {

   public posX: number;
   public posY: number;
   public frontImage: PartialImage;
   public backImage: PartialImage;

   // actualImage
   public image: PartialImage;

   private type: string;
   private value: string;
   private message: string;

   constructor($type: string, $value: string, $message: string) {
       super();
        this.type = $type;
        this.value = $value;
        this.message = $message;
   }

    public setFrontImage (image: PartialImage): void {
         this.frontImage =  image;
    }

    public showFrontImage (): void {
         this.image =  this.frontImage;
    }

     public setBackImage (image: PartialImage): void {
         this.backImage =  image;
    }
    public showBackImage (): void {
         this.image =  this.backImage;
    }
}

export default Card;
