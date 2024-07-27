import { FFIType, dlopen, JSCallback } from "bun:ffi";
import { button } from "./button";
import { backgroundbox } from "./containers/backgroundbox";
import { cbox } from "./containers/cbox";
import { detachbox } from "./containers/detachbox";
import { expander } from "./containers/expander";
import { fill } from "./containers/fill";
import { frame } from "./containers/frame";
import { gridbox } from "./containers/gridbox";
import { hbox } from "./containers/hbox";
import { multibox } from "./containers/multibox";
import { normalizer } from "./containers/normalizer";
import { radio } from "./containers/radio";
import { sbox } from "./containers/sbox";
import { scrollbox } from "./containers/scrollbox";
import { space } from "./containers/space";
import { split } from "./containers/split";
import { tabs } from "./containers/tabs";
import { vbox } from "./containers/vbox";
import { zbox } from "./containers/zbox";
import { cells } from "./controls/cells";
import { matrix } from "./controls/matrix";
import { matrixex } from "./controls/matrixex";
import { matrixlist } from "./controls/matrixlist";
import { datepick } from "./datepick";
import { dialog } from "./dialog";
import { gauge } from "./gauge";
import { label } from "./label";
import { list } from "./list";
import { progressbar } from "./progressbar";
import { spin } from "./spin";
import { text } from "./text";
import { toggle } from "./toggle";
import { tree } from "./tree";
import { thread } from "./utils/thread";
import { val } from "./val";
import { timer } from "./utils/timer";
import { menu } from "./menus/menu";
import { item } from "./menus/item";
import { submenu } from "./menus/submenu";
import { separator } from "./menus/separator";
import { filedlg } from "./dialogs/filedlg";
import { colordlg } from "./dialogs/colordlg";
import { messagedlg } from "./dialogs/messagedlg";
import { fontdlg } from "./dialogs/fontdlg";
import { progressdlg } from "./dialogs/progressdlg";
import { scintilladlg } from "./dialogs/scintilladlg";

import { iup_lib, iupfiledlg_lib, iupcontrols_lib, iupim_lib, iup_scintilla_lib, iupimglib_lib } from "./utils/import_libs";
import { iup_definitions } from "./iup_lib/definitions";

const { ptr, cstring, i32 } = FFIType;

let path = iup_lib;

export const {
    symbols: {
        IupOpen,
        IupMessage,
        IupMessageError,
        IupSetGlobal,
        IupMainLoop,
        IupDialog,
        IupShow,
        IupShowXY,
        IupSetHandle,
        IupGetHandle,
        IupSetCallback,
        IupSetStrAttribute,
        IupSetAttribute,
        IupGetAttribute,
        IupAppend,
        IupMap,
        IupLoadBuffer,
        IupThread,
        IupTimer,
        IupLoopStep,
        IupSetFunction,
        IupPopup,

        IupButton,
        IupText,
        IupLabel,
        IupList,
        IupDatePick,
        IupGauge,
        IupProgressBar,
        IupSpin,
        IupToggle,
        IupTree,
        IupVal,
        IupFill,
        IupSpace,
        IupHbox,
        IupVbox,
        IupCbox,
        IupGridBox,
        IupMultiBox,
        IupZbox,
        IupRadio,
        IupNormalizer,
        IupFrame,
        IupTabs,
        IupBackgroundBox,
        IupScrollBox,
        IupDetachBox,
        IupExpander,
        IupSbox,
        IupSplit,
        IupMenu,
        IupItem,
        IupSubmenu,
        IupSeparator,

        IupFileDlg,
        IupMessageDlg,
        IupColorDlg,
        IupFontDlg,
        IupProgressDlg,
    }
} = dlopen(path, iup_definitions);

const pathIupControls = iupcontrols_lib;

export const {
    symbols: {
        IupControlsOpen,
        IupCells,
        IupMatrix,
        IupMatrixEx,
        IupMatrixList,
    },
} = dlopen(pathIupControls, {
    IupControlsOpen: { args: [], returns: i32 },
    IupCells: { args: [], returns: ptr },
    IupMatrix: { args: [cstring], returns: ptr },
    IupMatrixEx: { args: [cstring], returns: ptr },
    IupMatrixList: { args: [], returns: ptr },
});

const pathIupScintilla = iup_scintilla_lib;

export const {
    symbols: {
        IupScintillaOpen,
        IupScintilla,
        IupScintillaDlg
    },
} = dlopen(pathIupScintilla, {
    IupScintillaOpen: { args: [], returns: i32 },
    IupScintilla:  { args: [], returns: ptr }, 
    IupScintillaDlg: { args: [], returns: ptr },
});

const pathIupImgLib = iupimglib_lib;

export const {
    symbols: {
        IupImageLibOpen,
    },
} = dlopen(pathIupImgLib, {
    IupImageLibOpen: { args: [], returns: i32 },
});

const pathIupIm = iupim_lib;

export const {
    symbols: {
        IupLoadImage
    },
} = dlopen(pathIupIm, {
    IupLoadImage: { args: [cstring], returns: ptr }
});

const pathIupfiledlg = iupfiledlg_lib;

export const {
    symbols: {
        IupNewFileDlgOpen
    },
} = dlopen(pathIupfiledlg, {
    IupNewFileDlgOpen: { args: [], returns: ptr }
});

export function str(template, ...values) {
    return Buffer.from(`${template.map((component, index) => values[index] ? component + values[index] : component).join('')}\0`);
}

export class iup {
    constructor() { }

    static aditionalControlsEnabled = false;
    static webBrowserEnabled = false;
    static oleControlOpenEnabled = false;
    static scintillaEnabled = false;
    static imgLibEnabled = false;

    static open() {
        IupOpen();
        IupSetGlobal(str`UTF8MODE`, str`YES`);
        IupSetGlobal(str`UTF8MODE_FILE`, str`YES`);
        if (process.platform === 'win32') IupNewFileDlgOpen();
    }

    static mainLoop() {
        IupMainLoop();
    };

    static map(child) {
        IupMap(child.handle);
    };

    static message(title, message) {
        IupMessage(str`${title}`, str`${message}`)
    }

    static messageError(parent, message) {
        IupMessageError(parent, str`${message}`)
    }

    static loopStep() {
        return IupLoopStep()
    }

    static async loadLedFromFile(path) {
        return IupLoadBuffer(str`${await Bun.file(path).text()}`);
    }

    static setFunction(name, cb) {
        IupSetFunction(str`${name}`, new JSCallback(cb, {}));
    }

    static controlsOpen() {
        if (!this.aditionalControlsEnabled) IupControlsOpen();
        this.aditionalControlsEnabled = true;
    }

    static scintillaOpen() {
        if (!this.scintillaEnabled) IupScintillaOpen();
        this.scintillaEnabled = true;
    }

    static imgLibOpen() {
        if (!this.imgLibEnabled) IupImageLibOpen();
        this.imgLibEnabled = true;
    }
}

const IUP_CENTER = 0xFFFF;  /* 65535 */
const IUP_LEFT = 0xFFFE;  /* 65534 */
const IUP_RIGHT = 0xFFFD;  /* 65533 */
const IUP_MOUSEPOS = 0xFFFC;  /* 65532 */
const IUP_CURRENT = 0xFFFB;  /* 65531 */
const IUP_CENTERPARENT = 0xFFFA;  /* 65530 */
const IUP_TOP = IUP_LEFT;
const IUP_BOTTOM = IUP_RIGHT;

export {
    IUP_CENTER,
    IUP_LEFT,
    IUP_RIGHT,
    IUP_MOUSEPOS,
    IUP_CURRENT,
    IUP_CENTERPARENT,
    IUP_TOP,
    IUP_BOTTOM,

    backgroundbox,
    button,
    cbox,
    cells,
    datepick,
    detachbox,
    dialog,
    expander,
    fill,
    frame,
    gauge,
    gridbox,
    hbox,
    label,
    list,
    matrix,
    matrixex,
    matrixlist,
    multibox,
    normalizer,
    progressbar,
    radio,
    sbox,
    scrollbox,
    space,
    spin,
    split,
    tabs,
    text,
    thread,
    toggle,
    tree,
    val,
    vbox,
    zbox,
    timer,
    menu,
    item,
    submenu,
    separator,
    filedlg,
    colordlg,
    messagedlg,
    fontdlg,
    progressdlg,
    scintilladlg
};