import {Player} from '../../entities/Player';
import { CheckersBoard } from "./entities/CheckersBoard";

import { Game } from "./../../entities/Game";
import { Checker } from "./entities/Checker";

export class CheckersGame extends Game {

    public player_1: Player;
    public player_2: Player;
    public player_1_checkers: Checker[];
    public player_2_checkers: Checker[];
    public id ="Checkers";

   constructor(players: Player[]) {
       super();
       this.cardsINturn = [] ;
       this.players = players;
       this.player_1_checkers =[];
       this.player_2_checkers =[];

       this.player_1 = this.players[0];
       this.player_2 = this.players[1];

       this.player_1_checkers.push(new Checker(0,0,0));
       this.player_1_checkers.push(new Checker(0,2,0));
       this.player_1_checkers.push(new Checker(0,4,0));
       this.player_1_checkers.push(new Checker(0,6,0));
       this.player_1_checkers.push(new Checker(0,8,0));
       this.player_1_checkers.push(new Checker(0,1,1));
       this.player_1_checkers.push(new Checker(0,3,1));
       this.player_1_checkers.push(new Checker(0,5,1));
       this.player_1_checkers.push(new Checker(0,7,1));
       this.player_1_checkers.push(new Checker(0,9,1));
       this.player_1_checkers.push(new Checker(0,0,2));
       this.player_1_checkers.push(new Checker(0,2,2));
       this.player_1_checkers.push(new Checker(0,4,2));
       this.player_1_checkers.push(new Checker(0,6,2));
       this.player_1_checkers.push(new Checker(0,8,2));

       this.player_2_checkers.push(new Checker(1,0,6));
       this.player_2_checkers.push(new Checker(1,2,6));
       this.player_2_checkers.push(new Checker(1,4,6));
       this.player_2_checkers.push(new Checker(1,6,6));
       this.player_2_checkers.push(new Checker(1,8,6));
       this.player_2_checkers.push(new Checker(1,1,7));
       this.player_2_checkers.push(new Checker(1,3,7));
       this.player_2_checkers.push(new Checker(1,5,7));
       this.player_2_checkers.push(new Checker(1,7,7));
       this.player_2_checkers.push(new Checker(1,9,7));
       this.player_2_checkers.push(new Checker(1,0,8));
       this.player_2_checkers.push(new Checker(1,2,8));
       this.player_2_checkers.push(new Checker(1,4,8));
       this.player_2_checkers.push(new Checker(1,6,8));
       this.player_2_checkers.push(new Checker(1,8,8));

    

       this.board = new CheckersBoard(0,0);

   }

}
