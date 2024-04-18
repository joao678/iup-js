import { base } from "../base";
import { IupFill } from "../iup";

export class fill extends base {
    constructor() {
        super();
        this.handle = IupFill();
    }
}