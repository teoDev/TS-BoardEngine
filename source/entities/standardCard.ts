import Card from "./Card";
import {PartialImage} from "../entities/PartialImage";
import {CardSuit} from "./CardColor";
class StandardCard extends Card  {

    public rank: number;

    constructor($type: string, $value: string, $message: string) {
        super($type, $value, $message);
        super.setFrontImage( new PartialImage("img/cards.png", parseInt($value, 10), CardSuit[$type], 73, 98));
        super.setBackImage( new PartialImage("img/cardBack.png", 0, 0, 73, 98));
        super.showFrontImage();
    }

}

export default StandardCard;
