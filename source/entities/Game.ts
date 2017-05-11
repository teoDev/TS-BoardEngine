import {Card} from './card';
import { Board } from "./board";
import { GameElement } from "./GameElement";
import { Player } from "./Player";
import * as HashStatic from "object-hash";



export class Game  {
    public players:  Player[];
    public player: Player;
    public playersQueue: Player[];
    public board: Board;
    public gameElements: GameElement[] ;
    public playerTurn: Player;
    public cardsINturn: Card[];
    public elementsAssignedToPlayers: Map<string, GameElement[]>; // key:playerID
    public id;
    public hash;

   constructor() {
        this.gameElements = [];
        this.players = [];
        this.playersQueue = [];
        this.elementsAssignedToPlayers = new Map<string, GameElement[]>();
        this.hash = this.genHashCode();
   }

   public getGameElements( ): GameElement[] {
        return this.gameElements;
    }

     private genHashCode(){
        const time = new Date().getDate;
        return HashStatic.sha1(time.toString + Math.random().toString());
    }


}


