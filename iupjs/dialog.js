import { base } from "./base";
import { IupDialog, IupShow, str } from "./iup";

export class dialog extends base {
    handle = null;
    constructor(child) {
        super();
        this.handle = IupDialog(child.handle);
    }

    show() {
        IupShow(this.handle);
    }
}