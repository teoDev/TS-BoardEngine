import {Game} from '../entities/Game';
import {Player} from '../entities/Player';


export class GameRoom {
  public players = new Array<Player>();
  public roomID: number;
  public isFull: Boolean = false;
  public game: Game;
  public sockets = [];

  public addPlayer(player: Player) {
    this.players.push(player);
    console.log(player.name + " joined room: " + this.roomID);
    if (this.players.length === 2 ) {
      this.isFull = true;
    }
  }


}
