import { base } from "../base";
import { IupMatrix, iup, str } from "../iup";

export class matrix extends base {
    constructor(action = 'ACTION') {
        super();
        iup.controlsOpen();
        this.handle = IupMatrix(str`${action}`);
    }
}