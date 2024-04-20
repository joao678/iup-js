import { base } from "../base";
import { IupMatrixList, iup, str } from "../iup";

export class matrixlist extends base {
    constructor() {
        super();
        iup.controlsOpen();
        this.handle = IupMatrixList();
    }
}