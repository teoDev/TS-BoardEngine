
import "createjs";
import { GameElement } from "./GameElement";
import { Board } from "./board";
import { Player } from "./Player";


export class Game  {
    public players =  Array<Player> ();
    public board: Board;
    public boardView:  React.Component<any, any>;
    private gameElements = Array<GameElement>() ;
    private rednerQueue;

    public addGameElement( gameElement: GameElement, container?: React.ReactElement<any>) {
        this.gameElements.push(gameElement);
    }


     public assignGameElementToPlayer(gameElement: GameElement, player: Player) {
        player.addGameElement(gameElement);
    }

    public getGameElements( ) {
        return this.gameElements;
    }

    public initRender(){
         let stage = new createjs.Stage($("#mainCanvas").get(0));
         this.rednerQueue = new createjs.LoadQueue();
    }
}


