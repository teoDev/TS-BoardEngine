import * as $ from "jquery";
import { Player } from "./entities/Player";
import { StandardDeck } from "./entities/StandardDeck";
import { Board } from "./entities/board";
import * as socketIo from "socket.io-client";
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

class SocketService {
     private _socket;
     private SERVER_URL = "http://localhost:8080";

     public getSocket() {
      if (this._socket === undefined) {
        this.initSocket();
      }
      return this._socket;
    }

    private initSocket(): void {
        this._socket = socketIo(this.SERVER_URL);
    }

}


let socketService = new SocketService();
let io = socketService.getSocket();

function gameLoop() {
   requestAnimationFrame(gameLoop);
}

$( document ).ready(function() {
 canvas =  <HTMLCanvasElement> $("#myCanvas").get(0);
   ctx = canvas.getContext("2d");
   gameLoop();
   let board = new Board(500, 500, ctx);
   let deck = new StandardDeck();
   board.draw(deck.getRandomCard(), 15, 15);
   board.draw(deck, 100, 100);


    $("#getCard").click(function () {
     joinGame(io);
  });
});

function joinGame(socket) {
  if (socket !== undefined) {
    let player = new Player();
    player.name = "tolek";
    socket.emit("joinGame", player, 1);
  }
}

