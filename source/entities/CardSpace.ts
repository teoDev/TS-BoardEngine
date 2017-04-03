import {Card} from "./card";
import {EmptySpace} from "./EmptySpace";

export  class CardSpace extends EmptySpace  {

   public cards:  Card[];

   constructor(){
       super();
       this.cards = [];
   }

   public empty() {
       this.cards = [];
   }

   public addCard(card: Card){
       card.setPosition(this.posX + 15, this.posY + 15);
       this.cards.push(card);
   }


}

