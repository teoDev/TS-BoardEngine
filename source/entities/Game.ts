import {Card} from './card';
import { Board } from "./board";
import { GameElement } from "./GameElement";
import { Player } from "./Player";


export class Game  {
    public players:  Player[];
    public player: Player;
    public playersQueue: Player[];
    public board: Board;
    public gameElements: GameElement[] ;
    public playerTurn: Player;
    public cardsINturn: Card[];
    public elementsAssignedToPlayers: Map<string, GameElement[]>; // key:playerID

   constructor() {
        this.gameElements = [];
        this.players = [];
        this.playersQueue = [];
        this.elementsAssignedToPlayers = new Map<string, GameElement[]>();
   }

   public getGameElements( ): GameElement[] {
        return this.gameElements;
    }


}


