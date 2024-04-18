import { base } from "../base";
import { IupZbox } from "../iup";
import { appendable } from "../traits/appendable";
import { applyMixin } from "../utils/mixin";

export class zbox extends base {
    constructor() {
        super();
        this.handle = IupZbox(...Array.from(arguments).map((child) => child.handle));
    }
}

applyMixin(zbox, appendable);