import { base } from "./base";
import { IupList, str } from "./iup";

export class list extends base {
    constructor(action = 'ACTION') {
        super();
        this.handle = IupList(str`${action}`);
    }
}