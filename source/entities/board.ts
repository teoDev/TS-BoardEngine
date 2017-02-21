import * as React from "react";


 export abstract class Board {
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
      this.width = width;
      this.height = height;
    }


    public abstract getView( ): React.Component<any, any> ;

}

