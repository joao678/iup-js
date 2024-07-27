import { dialog } from "../dialog";
import { IupMessageDlg } from "../iup";

export class messagedlg extends dialog {
    constructor() {
        super();
        this.handle = IupMessageDlg();
    }
}