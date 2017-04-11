import {Game} from './entities/Game';
import {WarGame} from './example_games/WarGame/WarGame';
import {WarGameController} from './example_games/WarGame/controller/WarGameController';

import express = require("express");
import socketio = require("socket.io");
import http = require("http");
import {Player} from "./entities/Player";

const app = express();
app.set("port", 8080);


const server = http.createServer(app);
const io = socketio(server);
server.listen(app.get("port"),  () => {
  console.log("Express server listening on port " + app.get("port"));
});

let counter = 0;

class GameServer {
  private rooms: GameRoom[] = Array<GameRoom>();
  private gameName: String;
  private numberOfRoomsToStart: number = 5;

  public constructor() {
    this.gameName = "TestGame";
    for (let _i = 0; _i < this.numberOfRoomsToStart; _i++) {
      const room: GameRoom = new GameRoom();
      room.roomID = _i;
      this.addRoom(room);
    }
  }

  public addRoom(room: GameRoom) {
    this.rooms.push(room);
  }

  public getRooms():  GameRoom[]  {
   return this.rooms;
  }

  public getRoomById(roomID: number): GameRoom  {
   return this.rooms[roomID];
  }
  public sync() {
    console.log("sync");
  }
}

class GameRoom {
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

  public initGame() {
   console.log("INIT GAME");
   const warGame = new WarGame(this.players);
   const warGameController = new WarGameController(warGame, this.sockets); //pass room socket
   io.in("room_" + this.roomID).emit("initGame", {game: warGame});
   warGameController.start();
  }
}
const gameServer = new GameServer();

io.on("connection",  (client) => {
  console.log("User connected");

 // joined for specified game
  client.on("joinGame",  (playerName) => {
    let roomToJoin: GameRoom ;
    for (const gameRoom of gameServer.getRooms()) {
        // get first not full room to join
        if (!gameRoom.isFull){
                roomToJoin = gameRoom;
                break;
              }
        }
    console.log(playerName + " joined the game in room:", roomToJoin.roomID);
    client.join("room_" + roomToJoin.roomID);
    if (roomToJoin !== undefined) {
      const player = new Player(playerName + "_" + roomToJoin.players.length);
      roomToJoin.addPlayer(player);
      roomToJoin.sockets.push(client);
      client.emit("joinGame$Respond", player);
      if (roomToJoin.isFull) {
       roomToJoin.initGame();
      }
    }
  });

  client.on("sync",  (data) => {
    // Receive data from clients
    if (data.tank !== undefined) {
      gameServer.sync();
    }

    counter++;
  });

  client.on("leaveGame",  (player: Player) => {
    console.log(player.name + " has left the game");
    client.broadcast.emit("removePlayer", player);
  });

});
