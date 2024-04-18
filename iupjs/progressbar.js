import { base } from "./base";
import { IupProgressBar, str } from "./iup";

export class progressbar extends base {
    constructor() {
        super();
        this.handle = IupProgressBar();
    }
}