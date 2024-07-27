import { dialog } from "../dialog";
import { IupDialog, IupFileDlg, IupShow, IupShowXY, str } from "../iup";

export class filedlg extends dialog {
    constructor() {
        super();
        this.handle = IupFileDlg();
    }

    getCallbackParams(eventName) {
        let args = super.getCallbackParams(eventName);

        switch (eventName) {
            case 'file_cb':
                args = ['ptr', 'cstring', 'cstring']
                break;
        }

        return args;
    }
}