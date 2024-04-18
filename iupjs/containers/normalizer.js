import { base } from "../base";
import { IupNormalizer } from "../iup";

export class normalizer extends base {
    constructor() {
        super();
        this.handle = IupNormalizer(...Array.from(arguments).map((child) => child.handle));
    }
}