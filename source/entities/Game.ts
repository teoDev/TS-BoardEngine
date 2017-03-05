import * as $ from "jquery";
import { Board } from "./board";
import { GameElement } from "./GameElement";
import { Player } from "./Player";


export class Game  {
    public players:  Player[];
    public playersQueue: Player[];
    public board: Board;
    private gameElements: GameElement[] ;
    private stage: createjs.Stage;
    private images: createjs.Bitmap[];
    private boardContainer: createjs.Container;
    public playerTurn: Player;
    public socket: SocketIOClient.Socket;
   //  private rednerQueue;

   constructor() {
        this.stage = new createjs.Stage($("#board2").get(0));
        this.boardContainer  = new createjs.Container();
        createjs.Touch.enable(this.stage);
        this.gameElements = [];
        this.images = [];
        this.players = [];
        this.playersQueue = [];
   }

   public start() {
        this.initRender();
        this.initPlayerQueue(true);
        this.playerTurn = this.getNextPlayer();
   }

    public addGameElement( gameElement: GameElement) {
        this.gameElements.push(gameElement);
    }

    public addPlayer( playerToAdd: Player) {
        this.players.push(playerToAdd);
    }

    public initPlayerQueue(random: boolean) {
        for (const player of this.players) {
             this.playersQueue.push(player);
        }
    }

    public getNextPlayer( ): Player {
       const player = this.playersQueue.shift(); // get player
       console.log(this.playersQueue);
       this.playersQueue.push(player); // put him on end of queue
       console.log(this.playersQueue);
       console.log("Player turn" + player.name);
       return player; // get new player;
    }



    public getGameElements( ): GameElement[] {
        return this.gameElements;
    }

    public renderBoard(){
         const boardImg = new createjs.Bitmap(this.board.imgSRC);
         boardImg.scaleX = this.board.scaleX;
         boardImg.scaleY = this.board.scaleY;
         this.images.push(boardImg);
         this.boardContainer.addChild(boardImg);
         this.stage.addChild(this.boardContainer);
    }
    public renderGameElements(){
            for (const gameElement of this.gameElements) {
            this.drawElement(gameElement);
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

    public drawElement(gameElement: GameElement){
        const boardContainer = this.boardContainer;
        const gameElementImg = new createjs.Bitmap(gameElement.imgSRC);
        gameElement.img = gameElementImg;
        this.images.push(gameElementImg);
        boardContainer.addChild(gameElementImg);

        if (gameElement.draggable) {
                    gameElementImg.on("pressmove", function(evt: any) {
                    evt.target.x = evt.stageX /  boardContainer.scaleX;
                    evt.target.y = evt.stageY /  boardContainer.scaleY;
                    boardContainer.setChildIndex( gameElementImg, boardContainer.getNumChildren() - 1);
                });
             }
             // assign click callback
        if (gameElement.clickCallback !== undefined){
                 gameElementImg.on("click", gameElement.clickCallback);
             }
        gameElementImg.scaleX =  gameElement.scaleX;
        gameElementImg.scaleY =  gameElement.scaleY;
        gameElementImg.x = gameElement.posX;
        gameElementImg.y = gameElement.posY;
    }

    public removeElement(gameElement: GameElement){
        this.boardContainer.removeChild(gameElement.img);
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


