import { Board } from '../../../entities/board';
import { Tile } from "./Tile";


export class CheckersBoard extends Board {

    public whiteTiles: Tile[] = [];
    public blackTiles: Tile[] = [];


    constructor(width: number, height: number) {
        super();
        for(let i =0; i < 10; i++){
             for (let j = 0; j < 10; j++){
                  const tile: Tile = new Tile(100, 100);
                  tile.xAxis = j ;
                  tile.yAxis = i ;
                  if ((i % 2 === 0 && j % 2 === 0) || (i % 2 === 1 && j % 2 === 1) ) {
                      this.blackTiles.push(tile);
                    }else{
                        this.whiteTiles.push(tile);
                    }
             }
       }
    }

}

