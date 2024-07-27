import { dialog } from "../dialog";
import { IupColorDlg } from "../iup";

export class colordlg extends dialog {
    constructor() {
        super();
        this.handle = IupColorDlg();
    }

    getCallbackParams(eventName) {
        let args = super.getCallbackParams(eventName);

        switch (eventName) {
            case 'colorupdate_cb':
                args = ['ptr']
                break;
        }

        return args;
    }
}