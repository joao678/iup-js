import { base } from "../base";
import { IupTimer } from "../iup";


export class timer extends base {
    constructor() {
        super();
        this.handle = IupTimer();
    }
}