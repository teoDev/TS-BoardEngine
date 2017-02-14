
import { StandardDeck } from "./../entities/StandardDeck";
import { Game } from "./../entities/Game";

export class WarGame extends Game {
   constructor() {
       super();
       let deck_1 = new StandardDeck();
       let deck_2 = new StandardDeck();
       this.addGameElement(deck_1);
       this.addGameElement(deck_2);
   }
}
