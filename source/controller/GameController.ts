import {GameElement} from '../entities/GameElement';
import {Player} from '../entities/Player';
import {Game} from '../entities/Game';


export class GameController  {
    public model: Game;
    public socket: SocketIOClient.Socket;

   constructor(model: Game) {
       this.model = model;
   }

   public start() {
        this.initPlayerQueue(true);
        this.model.playerTurn = this.getNextPlayer();
   }

    public addGameElement( gameElement: GameElement) {
        this.model.gameElements.push(gameElement);
    }

    public addPlayer( playerToAdd: Player) {
        this.model.players.push(playerToAdd);
    }

    public initPlayerQueue(random: boolean) {
        for (const player of this.model.players) {
             this.model.playersQueue.push(player);
        }
    }

    public getNextPlayer( ): Player {
       const player = this.model.playersQueue.shift(); // get player
       console.log(this.model.playersQueue);
       this.model.playersQueue.push(player); // put him on end of queue
       console.log(this.model.playersQueue);
       console.log("Player turn" + player.name);
       return player; // get new player;
    }

}


