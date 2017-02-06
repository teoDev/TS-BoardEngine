import Card from "../entities/Card";
abstract class Deck {
    public cards:  Array<Card> ;
    public showAllCards: () => void;

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
