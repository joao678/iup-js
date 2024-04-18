import { base } from "../base";
import { IupCbox } from "../iup";
import { appendable } from "../traits/appendable";
import { applyMixin } from "../utils/mixin";

export class cbox extends base {
    constructor() {
        super();
        this.handle = IupCbox(...Array.from(arguments).map((child) => child.handle));
    }
}

applyMixin(cbox, appendable);