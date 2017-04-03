import {Drawable} from "../interfaces/Drawable";
import { GameElement } from "./../entities/GameElement";

export  class GameElementView implements Drawable {
    public model: GameElement;
    public imgSRC;
    public img: createjs.Bitmap;
    public scaleX = 1.0;
    public scaleY = 1.0;


    public draggable = false;
    public clickable = false;

    public clickCallback;

    public constructor(gameElementModel: GameElement) {
        this.model = gameElementModel;
    }

    public updatePosition() {
        this.img.x = this.model.posX;
        this.img.y = this.model.posY;
    }


    public onClick(clickCallback) {
        this.clickCallback = clickCallback;
    };



}

