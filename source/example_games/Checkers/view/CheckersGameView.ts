import {CheckersGame} from '../CheckersGame';
import { CheckersBoard } from "./../entities/CheckersBoard";
import { CheckersBoardView } from "./CheckersBoardView";
import {GameView} from "../../../view/GameView";

export class CheckersGameView extends GameView {
    public model: CheckersGame;

   constructor(model: CheckersGame, socket) {
       super(model );
       this.socket = socket;

       const checkersBoad: CheckersBoard = this.model.board as CheckersBoard;
       this.boardView = new CheckersBoardView(checkersBoad, 800, 600);
       this.gameViewElements = this.gameViewElements.concat(this.boardView.viewElements);



       this.socket.on("getRandomCard$Response", (data) => {
                // const card: Card = data as StandardCard;
                // const cardView: StandardCardView = new StandardCardView(card);
                // this.cardsViews.push(cardView);
                // this.drawElement(cardView);
           });

       // this.deckView.onClick(clickDeckCallback);
       // this.deck2View.onClick(clickDeckCallback);

       this.socket.on("updateCardPosition$Request", (data) => {
           console.log("updatePosition");
           });

   }

}
