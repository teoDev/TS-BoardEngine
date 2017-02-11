
import express = require("express");
import socketio = require("socket.io");
import http = require("http");
import {Player} from "./entities/Player";

let app = express();
app.set("port", 8080);


let server = http.createServer(app);
let io = socketio(server);
server.listen(app.get("port"), function () {
  console.log("Express server listening on port " + app.get("port"));
});

let counter = 0;

class GameServer {
  private rooms: Array<GameRoom> = Array<GameRoom>();
  private gameName: String;
  private numberOfRoomsToStart: number = 5;

  public constructor() {
    this.gameName = "TestGame";
    for (let _i = 0; _i < this.numberOfRoomsToStart; _i++) {
      let room: GameRoom = new GameRoom();
      room.roomID = _i;
      this.addRoom(room);
    }
  }

  public addRoom(room: GameRoom) {
    this.rooms.push(room);
  }

  public getRooms(): Array<GameRoom>  {
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

  public addPlayer(player: Player) {
    this.players.push(player);
    console.log(player.name + " joined room: " + this.roomID);
  }
}
let gameServer = new GameServer();

io.on("connection", function (client) {
  console.log("User connected");
 // joined for specified game
  client.on("joinGame", function (player: Player, gameRoomIdToJoin: number) {
    console.log(player.name + " joined the game");
     gameServer.getRooms().forEach(function (gameRoom: GameRoom) {
      console.log();
    })
    let roomToJoin: GameRoom  = gameServer.getRoomById(gameRoomIdToJoin);
    if (roomToJoin !== undefined) {
      roomToJoin.addPlayer(player);
    }

   //  gameServer.addPlayer({ id: tank.id, type: tank.type, hp: 2 });
  });

  client.on("sync", function (data) {
    // Receive data from clients
    if (data.tank !== undefined) {
      gameServer.sync();
    }

    counter++;
  });

  client.on("pickCard", function () {
    console.log("pickCard");
  });

  client.on("leaveGame", function (player: Player) {
    console.log(player.name + " has left the game");
    // gameServer.removeTank(tankId);
    client.broadcast.emit("removePlayer", player);
  });

});
