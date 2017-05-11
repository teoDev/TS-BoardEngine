import { Checker } from "./../entities/Checker";
import { CheckerView } from "./CheckerView";

export class RedCheckerView extends CheckerView {

    constructor(model: Checker) {
        super(model);
        this.imgSRC = "img/redChecker.png";
    }

}

