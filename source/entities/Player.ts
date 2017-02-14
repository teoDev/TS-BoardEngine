import { GameElement } from "./GameElement";
export class Player  {
    public name: string;
    public gameElements:  Array<GameElement> ;
    public roomId: string;

     public addGameElement( gameElement: GameElement) {
        this.gameElements.push(gameElement);
    }
}


