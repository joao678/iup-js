import { base } from "../base";
import { IupFrame } from "../iup";

export class frame extends base {
    constructor(child) {
        super();
        this.handle = IupFrame(child.handle);
    }
}