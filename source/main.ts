import * as $ from "jquery";
import Greeter from "./entities/greeter";
import StandardDeck from "./entities/StandardDeck";
import Board from "./entities/Board";
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
    socket.emit("joinGame", { id: "12" });
  }
}



let greeter = new Greeter("world!");

let msg = greeter.greet();
console.log(msg);
