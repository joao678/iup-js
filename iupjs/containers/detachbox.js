import { base } from "../base";
import { IupDetachBox } from "../iup";

export class detachbox extends base {
    constructor(child) {
        super();
        this.handle = IupDetachBox(child.handle);
    }
}