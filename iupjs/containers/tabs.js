import { base } from "../base";
import { IupTabs } from "../iup";
import { appendable } from "../traits/appendable";
import { applyMixin } from "../utils/mixin";

export class tabs extends base {
    constructor() {
        super();
        this.handle = IupTabs(...Array.from(arguments).map((child) => child.handle));
    }
}

applyMixin(tabs, appendable);