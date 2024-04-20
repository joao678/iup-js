import { base } from "../base";
import { IupWebBrowser, iup, str } from "../iup";

export class webbrowser extends base {
    constructor() {
        super();
        iup.controlsOpen();
        iup.webBrowserOpen();
        this.handle = IupWebBrowser();
    }
}