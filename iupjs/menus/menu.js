import { base } from "../base";
import { IupMenu } from "../iup";
import { appendable } from "../traits/appendable";
import { applyMixin } from "../utils/mixin";

export class menu extends base {
    constructor() {
        super();
        this.handle = IupMenu(...Array.from(arguments).map((child) => child.handle));
    }
}

applyMixin(menu, appendable);