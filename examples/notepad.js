import { dialog, filedlg, fontdlg, item, iup, IUP_CENTER, IUP_CURRENT, menu, separator, submenu, text, vbox } from "../iupjs/iup";
import { readFileSync, writeFileSync } from "fs";

iup.open();

const multitext = new text();
multitext.multiline = "YES";
multitext.expand = "YES";

const dlg = new dialog(new vbox(multitext));
dlg.title = "Simple Notepad";
dlg.size = "QUARTERxQUARTER";

const menuBar = new menu(
    new submenu("File",
        new menu(
            (() => {
                const menuItem = new item("Open");
                menuItem.action = () => {
                    const fileDialog = new filedlg();
                    fileDialog.extfilter = 'All Files|*.*|';
                    fileDialog.dialogtype = 'open';
                    fileDialog.file_cb = function (handle, filename, status) {
                        if (status === 'OK') multitext.value = readFileSync(filename).toString();
                    }
                    fileDialog.popup();
                }
                return menuItem
            })(),
            (() => {
                const menuItem = new item("Save as");
                menuItem.action = () => {
                    const fileDialog = new filedlg();
                    fileDialog.extfilter = 'All Files|*.*|';
                    fileDialog.dialogtype = 'save';
                    fileDialog.file_cb = function (handle, filename, status) {
                        if (status === 'OK') writeFileSync(filename, multitext.value);
                    }
                    fileDialog.popup();
                }
                return menuItem
            })(),
            new separator(),
            (() => {
                const menuItem = new item("Exit");
                menuItem.action = () => process.exit();
                return menuItem
            })(),
        )
    ),
    new submenu("Format",
        new menu(
            (() => {
                const menuItem = new item("Font");
                menuItem.action = () => {
                    const fontDialog = new fontdlg();
                    fontDialog.value = multitext.font;
                    fontDialog.popup(IUP_CURRENT, IUP_CURRENT);
                    multitext.font = fontDialog.value;
                }
                return menuItem
            })()
        )
    )
);

dlg.dropfiles_cb = function (handle, filename, num, x, y) {
    multitext.value = readFileSync(filename).toString();
}

dlg.menu = menuBar;
dlg.showXY(IUP_CENTER, IUP_CENTER);
dlg.usersize = "NO";

iup.mainLoop();