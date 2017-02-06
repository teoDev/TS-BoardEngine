import {Drawable} from "../interfaces/Drawable";
import {PartialImage} from "./PartialImage";
class Board {
    private width: number;
    private height: number;
    private ctx: CanvasRenderingContext2D;
    private image = new Image();


    constructor(width: number, height: number, ctx: CanvasRenderingContext2D) {
      this.width = width;
      this.height = height;
      this.ctx = ctx;
    }

     public draw = (card: Drawable, posX: number, posY: number): void => {
         this.image.src =  card.image.imageSrc;
         this.image.onload = (() => this.imageReadyCallback(this.ctx, card.image, posX, posY));
    }

    private imageReadyCallback = (ctx: CanvasRenderingContext2D, pImage: PartialImage, posX: number, posY: number): void => {
         this.ctx.drawImage(this.image,
          pImage.xPosition * pImage.width,
          pImage.yPosition * pImage.height,
          pImage.width, pImage.height, posX, posY,  pImage.width, pImage.height);
    }

}

export default Board;
