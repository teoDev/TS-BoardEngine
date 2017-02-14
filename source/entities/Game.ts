
import { GameElement } from "./GameElement";
import { Board } from "./board";
import { Player } from "./Player";
export class Game  {
    public players =  Array<Player> ();
    public board: Board;
    private gameElements = Array<GameElement>() ;

    public addGameElement( gameElement: GameElement) {
        this.gameElements.push(gameElement);
    }

     public assignGameElementToPlayer(gameElement: GameElement, player: Player) {
        player.addGameElement(gameElement);
    }

    public getGameElements( ) {
        return this.gameElements;
    }
}


