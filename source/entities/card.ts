import {Drawable} from "../interfaces/Drawable";
import {PartialImage} from "../entities/PartialImage";

abstract class Card implements Drawable {

   public posX: number;
   public posY: number;
   public image: PartialImage;

   private type: string;
   private value: string;
   private message: string;

   constructor($type: string, $value: string, $message: string) {
        this.type = $type;
        this.value = $value;
        this.message = $message;
   }
}

export default Card;
