import {GameElementView} from './GameElementView';
import * as $ from "jquery";
import { BoardView } from "./BoardView";
import { GameController } from "./../controller/GameController";
import { Game } from "./../entities/Game";


export class GameView  {
    public model: Game;
    public controller: GameController;
    private stage: createjs.Stage;
    private images: createjs.Bitmap[];
    private boardContainer: createjs.Container;
    public boardView: BoardView;
    public gameViewElements: GameElementView[];
    public socket;

   constructor(gameModel: Game, gameController?: GameController) {
        this.model = gameModel;
        this.controller = gameController;
        this.stage = new createjs.Stage($("#board2").get(0));
        this.boardContainer  = new createjs.Container();
        createjs.Touch.enable(this.stage);
        this.images = [];
        this.gameViewElements = [];
   }


    public renderBoard() {
         const boardImg = new createjs.Bitmap(this.boardView.imgSRC);
         boardImg.scaleX = this.boardView.scaleX;
         boardImg.scaleY = this.boardView.scaleY;
         this.images.push(boardImg);
         this.boardContainer.addChild(boardImg);
         this.stage.addChild(this.boardContainer);
    }
    public renderGameElements() {
        for (const gameElementView of this.gameViewElements) {
            this.drawElement(gameElementView);
         }
    }

    public initTicker(){
         createjs.Ticker.on("tick", tick);
         createjs.Ticker.framerate = 30;
         const thatStage = this.stage;
         function tick(event) {
            thatStage.update(event);
        }
    }


    public initRender() {
         window.addEventListener("resize", () => this.resize(), false);
         this.renderBoard();
         this.renderGameElements();

         this.initTicker();
         // this.rednerQueue = new createjs.LoadQueue();
         this.stage.update();
         this.resize();
    }

    public drawElement(gameElementView: GameElementView){
        const boardContainer = this.boardContainer;
        const gameElementImg = new createjs.Bitmap(gameElementView.imgSRC);
        gameElementView.img = gameElementImg;
        this.images.push(gameElementImg);
        boardContainer.addChild(gameElementImg);

        if (gameElementView.draggable) {
                    gameElementImg.on("pressmove", function(evt: any) {
                    evt.target.x = evt.stageX /  boardContainer.scaleX;
                    evt.target.y = evt.stageY /  boardContainer.scaleY;
                    boardContainer.setChildIndex( gameElementImg, boardContainer.getNumChildren() - 1);
                });
             }
             // assign click callback
        if (gameElementView.clickCallback !== undefined){
                 gameElementImg.on("click", gameElementView.clickCallback);
             }
        gameElementImg.scaleX =  gameElementView.scaleX;
        gameElementImg.scaleY =  gameElementView.scaleY;
        gameElementImg.x = gameElementView.model.posX;
        gameElementImg.y = gameElementView.model.posY;
    }

    public removeElement(gameElementView: GameElementView){
        this.boardContainer.removeChild(gameElementView.img);
    }

      private resize(){
         const w = window.innerWidth -10;
         const h = window.innerHeight -10 ;
         const html5Canvas =  this.stage.canvas as HTMLCanvasElement;
         html5Canvas.width = w;
         html5Canvas.height = h;
         const contentWidth: number = 1400;
         const contentHeight: number = 700;
         const ratio = contentWidth / contentHeight;
         const windowRatio = w / h;
         let scale = w / contentWidth;
         if (windowRatio > ratio) {
                    scale = h / contentHeight;
         }
            // Scale up to fit width or height
         this.boardContainer.scaleX = this.boardContainer.scaleY = scale;

         this.stage.update();
        }
}


