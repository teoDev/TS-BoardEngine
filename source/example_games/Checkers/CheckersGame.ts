import {Player} from '../../entities/Player';
import { CheckersBoard } from "./entities/CheckersBoard";

import { Game } from "./../../entities/Game";

export class CheckersGame extends Game {

    public player_1: Player;
    public player_2: Player;

   constructor(players: Player[]) {
       super();
       this.cardsINturn = [] ;
       this.players = players;

       this.player_1 = this.players[0];
       this.player_2 = this.players[1];

       this.board = new CheckersBoard(0,0);

   }

}
