export class PartialImage {
     public imageSrc: string;
     public xPosition: number;
     public yPosition: number;
     public width: number;
     public height: number;

    constructor(imageSrc: string,  xPosition: number, yPosition: number,  width: number, height: number) {
        this.imageSrc = imageSrc;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.width = width;
        this.height = height;
    }

}

