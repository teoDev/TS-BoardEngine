import { GameElement } from "./GameElement";
export class Player  {
    public name: string;
    public gameElements:  GameElement[] ;
    public roomId: string;


    constructor( playerName: string) {
        this.name = playerName;
        this.gameElements = [];
    }

    public getGameElement(gameElementClass): GameElement[]{
        const gameElementsToReturn = [];
        for (const gameElement of this.gameElements) {
            if (gameElement instanceof gameElementClass) {
                gameElementsToReturn.push(gameElement);
            }
        }
        return gameElementsToReturn;
    }

    public cloneForSerialization(){
        return{
            name: this.name,
            roomID: this.roomId,
        }
    }
}


