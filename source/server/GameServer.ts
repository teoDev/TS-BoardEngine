import {GameController} from '../controller/GameController';
import { Game } from "./../entities/Game";
import {Player} from "../entities/Player";

import { GameRoom } from "./GameRoom";

import express = require("express");
import socketio = require("socket.io");
import http = require("http");
import monk = require("monk");

export abstract class GameServer {
  public db;
  public gameCollection;
  protected app;
  private rooms: GameRoom[] = Array<GameRoom>();
  private gameName: String;
  private numberOfRoomsToStart: number = 5;
  private socket;

  public constructor() {
    this.gameName = "TestGame";
    this.db = monk("localhost:27017/boardDataBase");
    this.gameCollection = this.db.get("gameCollection");
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

   public abstract initGame(gameRoom: GameRoom ):Game ;
   public abstract initController(gameRoom: GameRoom, sockets ): GameController ;


  public addRoom(room: GameRoom) {
    this.rooms.push(room);
  }

  public getRooms():  GameRoom[]  {
   return this.rooms;
  }

  public getRoomById(roomID: number): GameRoom  {
   return this.rooms[roomID];
  }

  
   public addNotifier(){
     this.app.get("/" + "game" + "/isUp", (req, res) => {
        res.json({up: "default"});

    });
  }


  private connectionListener(clientSocket){
    console.log("User connected");

    // joined for specified game
    clientSocket.on("joinGame",  (playerName, gameToken) => {
        let roomToJoin: GameRoom ;
        let joinToExistingRoom = false;
        // Check gameroom with previous game exist
        for (const gameRoom of this.getRooms()) {
            if(gameRoom.game !== undefined ){
                if( gameRoom.game.hash === gameToken){
                        roomToJoin = gameRoom;
                        joinToExistingRoom = true;
                    }
            }
        }
        if(joinToExistingRoom){
             const player = roomToJoin.game.players[0];
             clientSocket.emit("joinGame$Respond", player, gameToken);
             clientSocket.emit("initGame", {game: roomToJoin.game, gameToken:roomToJoin.game.hash});
             console.log(playerName + " joined the existing game in room:", roomToJoin.roomID);
             return;
        }
        if(roomToJoin===undefined){
            for (const gameRoom of this.getRooms()) {
            // get first not full room to join
            if (!gameRoom.isFull){
                    roomToJoin = gameRoom;
                    break;
                }
            }
        }
        console.log(playerName + " joined the game in room:", roomToJoin.roomID);
        clientSocket.join("room_" + roomToJoin.roomID);
        if (roomToJoin !== undefined) {
            const player = new Player(playerName + "_" + roomToJoin.players.length);
            roomToJoin.addPlayer(player);
            roomToJoin.sockets.push(clientSocket);
            clientSocket.emit("joinGame$Respond", player, gameToken);
            if (roomToJoin.isFull) {
                const gameModelPromise = this.gameCollection.findOne( { hash: gameToken } );
                gameModelPromise.then((gameModel) => {
                    if (gameModel !== null){
                        console.log("#gameFromDB::");
                    }else{
                        gameModel = this.initGame(roomToJoin);
                        this.gameCollection.insert(gameModel, function(err, doc) {
                            if (err) {
                                // If it failed, return error
                            console.error("There was a problem adding the information to the database.");
                            }else {
                                 console.log("userlist");
                            }
                        });
                    }
                    roomToJoin.game = gameModel;
                    for (const client of roomToJoin.sockets) {
                         client.in("room_" + roomToJoin.roomID).emit("initGame", {game: gameModel, gameToken:gameModel.hash});
                    }
                    this.initController(roomToJoin, roomToJoin.sockets);
                    });
             }
        }
    });

    clientSocket.on("leaveGame",  (player: Player) => {
        console.log(player.name + " has left the game");
        clientSocket.broadcast.emit("removePlayer", player);
    });

  };

}
