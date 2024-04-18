import { base } from "./base";
import { IupLabel, str } from "./iup";

export class label extends base {
    constructor(title) {
        super();
        this.handle = IupLabel(str`${title}`);
    }
}