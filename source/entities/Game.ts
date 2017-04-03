import { Board } from "./board";
import { GameElement } from "./GameElement";
import { Player } from "./Player";


export class Game  {
    public players:  Player[];
    public playersQueue: Player[];
    public board: Board;
    public gameElements: GameElement[] ;
    public playerTurn: Player;

   constructor() {
        this.gameElements = [];
        this.players = [];
        this.playersQueue = [];
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
    public getGameElements( ): GameElement[] {
        return this.gameElements;
    }

}


