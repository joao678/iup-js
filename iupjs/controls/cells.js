import { base } from "../base";
import { IupCells, iup, str } from "../iup";

export class cells extends base {
    constructor() {
        super();
        iup.controlsOpen();
        this.handle = IupCells();
    }
}