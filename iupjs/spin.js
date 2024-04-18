import { base } from "./base";
import { IupSpin, str } from "./iup";
import { appendable } from "./traits/appendable";
import { applyMixin } from "./utils/mixin";

export class spin extends base {
    constructor() {
        super();
        this.handle = IupSpin();
    }
}

applyMixin(spin, appendable);