import { base } from "../base";
import { IupHbox } from "../iup";
import { appendable } from "../traits/appendable";
import { applyMixin } from "../utils/mixin";

export class hbox extends base {
    constructor() {
        super();
        this.handle = IupHbox(...Array.from(arguments).map((child) => child.handle));
    }
}

applyMixin(hbox, appendable);