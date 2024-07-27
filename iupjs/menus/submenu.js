import { base } from "../base";
import { IupSubmenu, str } from "../iup";
import { appendable } from "../traits/appendable";
import { applyMixin } from "../utils/mixin";

export class submenu extends base {
    constructor(title, menu) {
        super();
        this.handle = IupSubmenu(str`${title}`, menu.handle);
    }
}

applyMixin(submenu, appendable);