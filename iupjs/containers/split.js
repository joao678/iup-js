import { base } from "../base";
import { IupSplit } from "../iup";

export class split extends base {
    constructor(child1, child2) {
        super();
        this.handle = IupSplit(child1.handle, child2.handle);
    }
}