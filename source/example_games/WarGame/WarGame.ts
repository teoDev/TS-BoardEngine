
import { StandardCardBoard } from "./../../entities/standardCardBoard";
import { StandardDeck } from "./../../entities/StandardDeck";
import { Game } from "./../../entities/Game";
import { BoardView} from "../../templates/components/board"

export class WarGame extends Game {
   constructor() {
       super();
       let deck_1 = new StandardDeck();
       let deck_2 = new StandardDeck();
       this.board = new StandardCardBoard(100, 100);
       let boardView_1 = this.board.getView() as BoardView;
       this.addGameElement(deck_1, boardView_1.player1Container);
       this.addGameElement(deck_2, boardView_1.player2Container);
   }
}
