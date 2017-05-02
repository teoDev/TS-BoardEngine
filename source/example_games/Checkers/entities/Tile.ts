import {GameElement} from '../../../entities/GameElement';


export class Tile extends GameElement {

    public xAxis: number; // cordinated on board
    public yAxis: number;
    public type: number;

    constructor(width: number, height: number) {
        super();
    }

}

