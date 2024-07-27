import { base } from "../base";
import { IupItem, str } from "../iup";
import { appendable } from "../traits/appendable";
import { applyMixin } from "../utils/mixin";

export class item extends base {
    constructor(title, action) {
        super();
        this.handle = IupItem(str`${title}`, str`${action}`);
    }
}

applyMixin(item, appendable);