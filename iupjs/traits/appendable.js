import { IupAppend } from "../iup";

export class appendable {
    append(child) {
        IupAppend(this.handle, child.handle);
    }
}