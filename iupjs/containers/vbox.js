import { base } from "../base";
import { IupVbox } from "../iup";
import { appendable } from "../traits/appendable";
import { applyMixin } from "../utils/mixin";

export class vbox extends base {
    constructor() {
        super();
        this.handle = IupVbox(...Array.from(arguments).map((child) => child.handle));
    }
}

applyMixin(vbox, appendable);