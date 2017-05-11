import { CheckerView } from "./CheckerView";
import { Checker } from "../entities/Checker";

export class BlackCheckerView extends CheckerView {

    constructor(model: Checker) {
        super(model);
        this.imgSRC = "img/blackChecker.png";
    }

}

