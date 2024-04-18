import { base } from "../base";
import { IupMultiBox } from "../iup";
import { appendable } from "../traits/appendable";
import { applyMixin } from "../utils/mixin";

export class multibox extends base {
    constructor() {
        super();
        this.handle = IupMultiBox(...Array.from(arguments).map((child) => child.handle));
    }
}

applyMixin(multibox, appendable);