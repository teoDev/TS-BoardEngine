import {Drawable} from "../interfaces/Drawable";
import { Player } from "./Player";

export abstract class GameElement implements Drawable {
    public imgSRC;
    public img: createjs.Bitmap;
    public scaleX = 1.0;
    public scaleY = 1.0;

    public posX = 0;
    public posY= 0;

    public player: Player;

    public draggable = false;
    public clickable = false;

    public clickCallback;

    public setPosition(x: number, y: number) {
        this.posX = x;
        this.posY = y;
    }

    public updateView() {
        this.img.x =  this.posX;
        this.img.y =  this.posY;
    }

    public onClick(clickCallback) {
        this.clickCallback = clickCallback;
    };

    public assignToPlayer(player: Player){
        player.gameElements.push(this);
        this.player  = player;
    }

    public cloneForSerialization() {
       return{
           posX: this.posX,
           posY: this.posY,
       }
   }

}

