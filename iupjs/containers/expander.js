import { base } from "../base";
import { IupExpander } from "../iup";

export class expander extends base {
    constructor(child) {
        super();
        this.handle = IupExpander(child.handle);
    }
}