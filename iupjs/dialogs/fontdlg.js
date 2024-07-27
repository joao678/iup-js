import { dialog } from "../dialog";
import { IupFontDlg } from "../iup";

export class fontdlg extends dialog {
    constructor() {
        super();
        this.handle = IupFontDlg();
    }
}