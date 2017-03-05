import Card from "./Card";
export class StandardCard extends Card  {

    public rank: number;

    constructor($type: string, $value: number, $message: string) {
        super($type, $value, $message);
        this.imgSRC = "img/cards/" + $type + "_" + $value + ".png";
        this.draggable = true;
       // super.setFrontImage( new PartialImage("img/cards.png", parseInt($value, 10), CardSuit[$type], 73, 98));
       // super.setBackImage( new PartialImage("img/cardBack.png", 0, 0, 73, 98));
       // super.showFrontImage();
    }

}

