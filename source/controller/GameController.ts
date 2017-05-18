import {GameElement} from "../entities/GameElement";
import {Player} from "../entities/Player";
import {Game} from "../entities/Game";
// import mongo = require("mongodb");



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

    public addGameElements( gameElements: GameElement[]) {
        console.log("Adding:",gameElements);
        this.model.gameElements = this.model.gameElements.concat(gameElements);
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


    public getGameElementByHash( hash: string): GameElement {
        console.log("Hash search:",hash);
        for (const gameElement of this.model.gameElements) {
             if (gameElement.hash ===  hash) {
                 console.log("Hash:",gameElement.hash,hash);
                 return gameElement;
             }
        }
    }

     public assignElementToPlayer( gameEl: GameElement, player: Player) {
        gameEl.player = player;
        let gameElements: GameElement[];
        if (this.model.elementsAssignedToPlayers.get(player.name) === undefined) {
            gameElements = [];
        }else {
            gameElements = this.model.elementsAssignedToPlayers.get(player.name);
        }
        gameElements.push(gameEl);
        this.model.elementsAssignedToPlayers.set(player.name,gameElements);
    }

     public getElementsAssignedToPlayer(player: Player): GameElement[] {
        const gameElements: GameElement[]  = [];
        if (this.model.elementsAssignedToPlayers.get(player.name) !== undefined) {
             return this.model.elementsAssignedToPlayers.get(player.name);
        }
        return gameElements;
    }

    public getElementsAssignedToPlayerByType(player: Player, type: string): GameElement[] {
        const gameElements: GameElement[]  = [];
        if (this.model.elementsAssignedToPlayers.get(player.name) !== undefined) {
             for (const gameEl of this.model.elementsAssignedToPlayers.get(player.name)) {
                      if (gameEl.constructor.name === type) {
                          gameElements.push(gameEl);
                      }
                }
        }
        return gameElements;
    }

    public isElementAssignedToPlayer(gameElement: GameElement, player: Player): boolean{
        let isAssigned = false;
        if (this.model.elementsAssignedToPlayers.get(player.name) !== undefined) {
             for (const gameEl of this.model.elementsAssignedToPlayers.get(player.name)) {
                      if (gameEl.hash === gameElement.hash) {
                          isAssigned = true;
                          break;
                      }
                }
        }
        return isAssigned;
    }



}


