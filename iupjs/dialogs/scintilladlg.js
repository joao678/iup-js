import { dialog } from "../dialog";
import { IupScintillaDlg } from "../iup";

export class scintilladlg extends dialog {
    constructor() {
        super();
        this.handle = IupScintillaDlg();
    }

    getCallbackParams(eventName) {
        let args = super.getCallbackParams(eventName);

        switch (eventName) {
            case 'exit_cb':
                args = ['ptr']
                break;
            case 'newtext_cb':
            case 'closetext_cb':
            case 'loadfile_cb':
            case 'savefile_cb':
            case 'restoremarkers_cb':
            case 'savemarkers_cb':
            case 'configload_cb':
            case 'configsave_cb':
                args = ['ptr', 'ptr']
                break;
            case 'markerchanged_cb':
                args = ['ptr', 'ptr', 'i32', 'i32']
                break;
            case 'newfilename_cb':
                args = ['ptr', 'ptr', 'cstring', 'cstring']
                break;
        }

        return args;
    }
}