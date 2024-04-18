import { base } from "../base";
import { IupBackgroundBox, IupHbox } from "../iup";
import { appendable } from "../traits/appendable";
import { applyMixin } from "../utils/mixin";

export class backgroundbox extends base {
    constructor() {
        super();
        this.handle = IupBackgroundBox(...Array.from(arguments).map((child) => child.handle));
    }
}

applyMixin(backgroundbox, appendable);