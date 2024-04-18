import { base } from "./base";
import { IupText, str } from "./iup";

export class text extends base {
    constructor(action = 'ACTION') {
        super();
        this.handle = IupText(str`${action}`);
    }
}