import { base } from "./base";
import { IupGauge, str } from "./iup";

export class gauge extends base {
    constructor() {
        super();
        this.handle = IupGauge();
    }
}