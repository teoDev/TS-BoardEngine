import { Player } from "./../entities/Player";
import { GameElement } from "./../entities/GameElement";

export  class GameElementController  {

    public model: GameElement;

    constructor(model: GameElement){
        this.model = model;
    }

    public assignToPlayer(player: Player) {
        this.model.player  = player;
    }


}

