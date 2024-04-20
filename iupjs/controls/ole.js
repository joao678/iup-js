import { base } from "../base";
import { IupOleControl, iup, str } from "../iup";

export class ole extends base {
    constructor(progid) {
        super();
        iup.controlsOpen();
        iup.oleControlOpen();
        this.handle = IupOleControl(str`${progid}`);
    }
}