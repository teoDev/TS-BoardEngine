import {GameElement} from '../../../entities/GameElement';


export class Checker extends GameElement {

    public xAxis: number; // cordinated on board
    public yAxis: number;
    public type: number;

    constructor(type:number, xAxis:number, yAxis:number) {
        super();
        this.type = type;
        this.xAxis = xAxis;
        this.yAxis = yAxis;
    }

}

