import { FFIType } from "bun:ffi";
import { button, dialog, hbox, iup, ole, vbox, webbrowser } from "./iupjs/iup";
const { ptr, cstring, i32 } = FFIType;

iup.open();

const btn = new button('teste');
const vbox1 = new vbox();

const temp = new button('teste');
vbox1.append(new hbox(temp));
vbox1.append(btn);

vbox1.expand = 'YES'
vbox1.expandchildren = 'YES'

const win = new dialog(vbox1);
win.size = 'QUARTERxQUARTER';
win.margin = '5';
win.title = 'Calc';

// btn.action = function () {
    
// };

win.show();
iup.mainLoop();