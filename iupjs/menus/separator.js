import { base } from "../base";
import { IupSeparator } from "../iup";

export class separator extends base {
    constructor() {
        super();
        this.handle = IupSeparator();
    }
}