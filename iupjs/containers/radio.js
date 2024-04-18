import { base } from "../base";
import { IupRadio } from "../iup";
import { appendable } from "../traits/appendable";
import { applyMixin } from "../utils/mixin";

export class radio extends base {
    constructor() {
        super();
        this.handle = IupRadio(...Array.from(arguments).map((child) => child.handle));
    }
}

applyMixin(radio, appendable);