import { base } from "../base";
import { IupThread } from "../iup";


export class thread extends base {
    constructor() {
        super();
        this.handle = IupThread();
    }
}