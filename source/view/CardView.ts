import {Card} from '../entities/card';
import {GameElementView} from "./GameElementView";

export class CardView extends GameElementView {

   public posX: number;
   public posY: number;

   // actualImage
   public imgSRC;


   constructor($model: Card) {
       super($model);
   }


}
