import { base } from "./base";
import { IupTree, str } from "./iup";

export class tree extends base {
    constructor() {
        super();
        this.handle = IupTree();
    }
}