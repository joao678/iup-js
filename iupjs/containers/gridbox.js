import { base } from "../base";
import { IupGridBox } from "../iup";
import { appendable } from "../traits/appendable";
import { applyMixin } from "../utils/mixin";

export class gridbox extends base {
    constructor() {
        super();
        this.handle = IupGridBox(...Array.from(arguments).map((child) => child.handle));
    }
}

applyMixin(gridbox, appendable);