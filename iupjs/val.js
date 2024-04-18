import { base } from "./base";
import { IupVal, str } from "./iup";

export class val extends base {
    constructor(orientation) {
        super();
        this.handle = IupVal(str`${orientation}`);
    }
}