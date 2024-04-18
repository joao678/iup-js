import { base } from "./base";
import { IupButton, str } from "./iup";

export class button extends base {
    constructor(title, action = 'ACTION') {
        super();
        this.handle = IupButton(str`${title}`, str`${action}`);
    }
}