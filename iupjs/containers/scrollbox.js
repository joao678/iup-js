import { base } from "../base";
import { IupScrollBox } from "../iup";
import { appendable } from "../traits/appendable";
import { applyMixin } from "../utils/mixin";

export class scrollbox extends base {
    constructor() {
        super();
        this.handle = IupScrollBox(...Array.from(arguments).map((child) => child.handle));
    }
}

applyMixin(scrollbox, appendable);