import {RedCheckerView} from './RedCheckerView';
import {CheckersGame} from "../CheckersGame";
import { GameElementView } from "./../../../view/GameElementView";
import { CheckersBoard } from "./../entities/CheckersBoard";
import { CheckersBoardView } from "./CheckersBoardView";
import {GameView} from "../../../view/GameView";
import { BlackCheckerView } from "./BlackCheckerView";

export class CheckersGameView extends GameView {
    public model: CheckersGame;

   constructor(model: CheckersGame, socket) {
       super(model );
       this.socket = socket;

       const checkersBoad: CheckersBoard = this.model.board as CheckersBoard;
       this.boardView = new CheckersBoardView(checkersBoad, 800, 600);

       this.gameViewElements = this.gameViewElements.concat(this.boardView.viewElements);

       let checkerCallback = function(evt,view:GameElementView){
           const column:number =  Math.floor(evt.target.x  / 78);
                    const row:number = Math.floor(evt.target.y / 78);
                    console.log(column,row);
                    //update model
                   // view.updatePosition();
                };
       let dragStopCallback = function(evt,view:GameElementView){
                    const column:number =  Math.abs(Math.round(evt.target.x / 78));
                    const row:number = Math.abs(Math.round(evt.target.y / 78));
                    //update model
                    view.img.x= column * 78;
                    view.img.y = row * 78;
                    console.log('Drag stop');
                   // view.updatePosition();
                };

       for (const redCheckerModel of model.player_1_checkers) {
                const redChecker = new RedCheckerView(redCheckerModel);
                redChecker.dragCallback = checkerCallback;
                redChecker.dragStopCallback = dragStopCallback;
                redCheckerModel.posX = redCheckerModel.xAxis * 78;
                redCheckerModel.posY = redCheckerModel.yAxis * 78;
                this.gameViewElements.push(redChecker);
        }

       for (const redCheckerModel of model.player_2_checkers) {
                const blackChecker = new BlackCheckerView(redCheckerModel);
                blackChecker.dragCallback = checkerCallback;
                blackChecker.dragStopCallback = dragStopCallback;
                redCheckerModel.posX = redCheckerModel.xAxis * 78;
                redCheckerModel.posY = redCheckerModel.yAxis * 78;
                this.gameViewElements.push(blackChecker);
        }

       






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
