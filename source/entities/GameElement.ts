import { Player } from "./Player";
import * as HashStatic from "object-hash";

export abstract class GameElement  {

    public posX = 0;
    public posY= 0;
    public hash;
    public player: Player;

    constructor(){
        this.hash = this.genHashCode();
    }

    public setPosition(x: number, y: number) {
        this.posX = x;
        this.posY = y;
    }

    private genHashCode(){
        const time = new Date().getDate;
        return HashStatic.sha1(time.toString + Math.random().toString());
    }
}

