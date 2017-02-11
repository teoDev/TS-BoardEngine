import Card from "../entities/Card";
import {GameElement} from "./GameElement";
import {Drawable} from "../interfaces/Drawable";
import {PartialImage} from "../entities/PartialImage";

abstract class Deck extends GameElement implements Drawable  {
    public cards:  Array<Card>  = Array<Card>();
    public showAllCards: () => void;

    public image: PartialImage;


    /**
     * setImage
     */
    public setDeckImage(image: PartialImage) {
        this.image = image;
    }

    public getRandomCard = (): Card => {
        // TODO:should be move to service
        let rand = Math.floor(Math.random() * this.cards.length);
        return this.cards[rand];
     }

     public shuffle = (): void => {
         // TODO: Implement
            this.cards.forEach(element => {
                console.log(element);
            });
     }
}
export default Deck;
