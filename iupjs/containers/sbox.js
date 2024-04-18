import { base } from "../base";
import { IupSbox } from "../iup";

export class sbox extends base {
    constructor(child) {
        super();
        this.handle = IupSbox(child.handle);
    }
}