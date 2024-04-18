import { base } from "./base";
import { IupToggle, str } from "./iup";

export class toggle extends base {
    constructor(title, action) {
        super();
        this.handle = IupToggle(str`${title}`, str`${action}`);
    }
}