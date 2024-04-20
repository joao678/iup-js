import { base } from "../base";
import { IupMatrix, str } from "../iup";

export class matrix extends base {
    constructor(action) {
        super();
        this.handle = IupMatrix(str`${action}`);
    }
}