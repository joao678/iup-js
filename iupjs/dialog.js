import { base } from "./base";
import { IupDialog, IupPopup, IupShow, IupShowXY, str } from "./iup";

export class dialog extends base {
    constructor(child) {
        super();
        this.handle = IupDialog(child?.handle);
    }

    getCallbackParams(eventName) {
        let args = super.getCallbackParams(eventName);

        switch (eventName) {
            case 'dropfiles_cb':
                args = ['ptr', 'cstring', 'i32', 'i32', 'i32']
                break;
            case 'close_cb':
                args = ['ptr']
                break;
            case 'copydata_cb':
                args = ['ptr', 'cstring', 'i32']
                break;
            case 'customframe_cb':
                args = ['ptr']
                break;
            case 'customframeactivate_cb':
                args = ['ptr', 'i32']
                break;
            case 'focus_cb':
                args = ['ptr', 'i32']
                break;
            case 'mdiactivate_cb':
                args = ['ptr']
                break;
            case 'move_cb':
                args = ['ptr', 'i32', 'i32']
                break;
            case 'resize_cb':
                args = ['ptr', 'i32', 'i32']
                break;
            case 'show_cb':
                args = ['ptr', 'i32']
                break;
            case 'trayclick_cb':
                args = ['ptr', 'i32', 'i32', 'i32']
                break;
                
        }

        return args;
    }

    show() {
        IupShow(this.handle);
    }

    showXY(x, y) {
        IupShowXY(this.handle, x, y);
    }

    popup(x, y) {
        IupPopup(this.handle, x, y);
    }
}