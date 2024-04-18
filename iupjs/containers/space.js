import { base } from "../base";
import { IupSpace } from "../iup";

export class space extends base {
    constructor() {
        super();
        this.handle = IupSpace();
    }
}