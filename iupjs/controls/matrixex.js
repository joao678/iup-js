import { base } from "../base";
import { IupMatrixEx, str } from "../iup";

export class matrixex extends base {
    constructor(action) {
        super();
        this.handle = IupMatrixEx(str`${action}`);
    }
}