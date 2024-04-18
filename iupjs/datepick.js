import { base } from "./base";
import { IupDatePick, str } from "./iup";

export class datepick extends base {
    constructor() {
        super();
        this.handle = IupDatePick();
    }
}