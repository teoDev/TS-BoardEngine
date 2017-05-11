import {Player} from '../entities/Player';

import { GameRoom } from "./GameRoom";

import express = require("express");
import socketio = require("socket.io");
import http = require("http");

export class GameServer {
  protected app;
  private rooms: GameRoom[] = Array<GameRoom>();
  private gameName: String;
  private numberOfRoomsToStart: number = 5;
  private socket;
  

  public constructor() {
    this.gameName = "TestGame";
    for (let _i = 0; _i < this.numberOfRoomsToStart; _i++) {
      const room: GameRoom = new GameRoom();
      room.roomID = _i;
      this.addRoom(room);
    }

    this.app = express();
    this.app.set("port", 8080);

    this.app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    this.addNotifier();

    const server = http.createServer(this.app);
    this.socket = socketio(server);

    server.listen(this.app.get("port"),  () => {
         console.log("Express server listening on port " + this.app.get("port"));
    });
    this.socket.on("connection",  (client) => this.connectionListener(client));
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

   public initGame(gameRoom:GameRoom ) {
      console.log("INIT GAME", gameRoom.game);
  }
   public addNotifier(){
     this.app.get("/" + "game" + "/isUp", (req, res)=>{
        res.json({"up": "default"});

    });
  }


  private connectionListener(clientSocket){
    console.log("User connected");

    // joined for specified game
    clientSocket.on("joinGame",  (playerName) => {
        let roomToJoin: GameRoom ;
        for (const gameRoom of this.getRooms()) {
            // get first not full room to join
            if (!gameRoom.isFull){
                    roomToJoin = gameRoom;
                    break;
                }
            }
        console.log(playerName + " joined the game in room:", roomToJoin.roomID);
        clientSocket.join("room_" + roomToJoin.roomID);
        if (roomToJoin !== undefined) {
            const player = new Player(playerName + "_" + roomToJoin.players.length);
            roomToJoin.addPlayer(player);
            roomToJoin.sockets.push(clientSocket);
            clientSocket.emit("joinGame$Respond", player);
            if (roomToJoin.isFull) {
                this.initGame(roomToJoin);
             }
        }
    });

    clientSocket.on("leaveGame",  (player: Player) => {
        console.log(player.name + " has left the game");
        clientSocket.broadcast.emit("removePlayer", player);
    });

  };

}
