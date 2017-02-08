
import express = require("express");
import socketio = require("socket.io");
import http = require("http");
import Deck from "./entities/Deck";


let app = express();
app.set("port", 8080);


let server = http.createServer(app);
let io = socketio(server);
server.listen(app.get("port"), function () {
  console.log("Express server listening on port " + app.get("port"));
});

let counter = 0;

class GameServer {
  private tanks = [];
  private decks = Array<Deck>();

  public addPlayer(tank) {
    this.tanks.push(tank);
  }
  public addDeck(ball: Deck) {
    this.decks.push(ball);
  }
 public removeTank(tankId) {
    this.tanks = this.tanks.filter(function (t) { return t.id !== tankId; });
  }
  public sync() {
    console.log("sync");
  }
}


let game = new GameServer();

io.on("connection", function (client) {
  console.log("User connected");

  client.on("joinGame", function (tank) {
    console.log(tank.id + " joined the game");
    game.addPlayer({ id: tank.id, type: tank.type, hp: 2 });
  });

  client.on("sync", function (data) {
    // Receive data from clients
    if (data.tank !== undefined) {
      game.sync();
    }

    counter++;
  });

  client.on("pickCard", function () {
    console.log("pickCard");
  });

  client.on("leaveGame", function (tankId) {
    console.log(tankId + " has left the game");
    game.removeTank(tankId);
    client.broadcast.emit("removeTank", tankId);
  });

});
