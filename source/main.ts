import * as $ from "jquery";
import Greeter from "./entities/greeter";
import StandardDeck from "./entities/StandardDeck";
import Board from "./entities/Board";


let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

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
});


let greeter = new Greeter("world!");

let msg = greeter.greet();
console.log(msg);
