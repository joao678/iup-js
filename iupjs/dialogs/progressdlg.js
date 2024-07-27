import { dialog } from "../dialog";
import { IupProgressDlg } from "../iup";

export class progressdlg extends dialog {
    constructor() {
        super();
        this.handle = IupProgressDlg();
    }

    getCallbackParams(eventName) {
        let args = super.getCallbackParams(eventName);

        switch (eventName) {
            case 'cancel_cb':
                args = ['ptr']
                break;
        }

        return args;
    }
}