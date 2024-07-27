import { base } from "../base";
import { IupMatrixEx, iup, str } from "../iup";

export class matrixex extends base {
    constructor(action) {
        super();
        iup.controlsOpen();
        this.handle = IupMatrixEx(str`${action}`);
    }
}