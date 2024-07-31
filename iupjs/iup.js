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

import {
    iup_lib_win, iupfiledlg_lib_win, iupcontrols_lib_win, iupim_lib_win, iup_scintilla_lib_win, iupimglib_lib_win,
    iup_lib_linux, iupcontrols_lib_linux, iupim_lib_linux, iup_scintilla_lib_linux, iupimglib_lib_linux
} from "./utils/import_libs";

import { iup_definitions } from "./iup_lib/definitions";
const { ptr, cstring, i32 } = FFIType;

let path = process.platform === 'win32' ? iup_lib_win : iup_lib_linux;

export const {
    symbols: {
        // Functions
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
        // Controls
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
        // Dialogs
        IupFileDlg,
        IupMessageDlg,
        IupColorDlg,
        IupFontDlg,
        IupProgressDlg,
    }
} = dlopen(path, iup_definitions);

const pathIupControls = process.platform === 'win32' ? iupcontrols_lib_win : iupcontrols_lib_linux;

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

const pathIupScintilla = process.platform === 'win32' ? iup_scintilla_lib_win : iup_scintilla_lib_linux;

export const {
    symbols: {
        IupScintillaOpen,
        IupScintilla,
        IupScintillaDlg
    },
} = dlopen(pathIupScintilla, {
    IupScintillaOpen: { args: [], returns: i32 },
    IupScintilla: { args: [], returns: ptr },
    IupScintillaDlg: { args: [], returns: ptr },
});

const pathIupImgLib = process.platform === 'win32' ? iupimglib_lib_win : iupimglib_lib_linux;

export const {
    symbols: {
        IupImageLibOpen,
    },
} = dlopen(pathIupImgLib, {
    IupImageLibOpen: { args: [], returns: i32 },
});

const pathIupIm = process.platform === 'win32' ? iupim_lib_win : iupim_lib_linux;

export const {
    symbols: {
        IupLoadImage
    },
} = dlopen(pathIupIm, {
    IupLoadImage: { args: [cstring], returns: ptr }
});

const pathIupfiledlg = iupfiledlg_lib_win;
let iupfiledlgLib = null;

if (process.platform === 'win32') {
    iupfiledlgLib = dlopen(pathIupfiledlg, {
        IupNewFileDlgOpen: { args: [], returns: ptr }
    });
} else {
    iupfiledlgLib = { symbols: { IupNewFileDlgOpen: () => { } } }
}

export const {
    symbols: {
        IupNewFileDlgOpen
    },
} = iupfiledlgLib;

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
        IupNewFileDlgOpen();
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

const IUP_ERROR = 1;
const IUP_NOERROR = 0;
const IUP_OPENED = -1;
const IUP_INVALID = -1;
const IUP_INVALID_ID = -10;
const IUP_IGNORE = -1;
const IUP_DEFAULT = -2;
const IUP_CLOSE = -3;
const IUP_CONTINUE = -4;
const IUP_CENTER = 0xFFFF;
const IUP_LEFT = 0xFFFE;
const IUP_RIGHT = 0xFFFD;
const IUP_MOUSEPOS = 0xFFFC;
const IUP_CURRENT = 0xFFFB;
const IUP_CENTERPARENT = 0xFFFA;
const IUP_LEFTPARENT = 0xFFF9;
const IUP_RIGHTPARENT = 0xFFF8;
const IUP_TOP = IUP_LEFT;
const IUP_BOTTOM = IUP_RIGHT;
const IUP_TOPPARENT = IUP_LEFTPARENT;
const IUP_BOTTOMPARENT = IUP_RIGHTPARENT;
const IUP_BUTTON1 = '1';
const IUP_BUTTON2 = '2';
const IUP_BUTTON3 = '3';
const IUP_BUTTON4 = '4';
const IUP_BUTTON5 = '5';
const IUP_MASK_FLOAT = "[+/-]?(/d+/.?/d*|/./d+)";
const IUP_MASK_UFLOAT = "(/d+/.?/d*|/./d+)";
const IUP_MASK_EFLOAT = "[+/-]?(/d+/.?/d*|/./d+)([eE][+/-]?/d+)?";
const IUP_MASK_UEFLOAT = "(/d+/.?/d*|/./d+)([eE][+/-]?/d+)?";
const IUP_MASK_FLOATCOMMA = "[+/-]?(/d+/,?/d*|/,/d+)";
const IUP_MASK_UFLOATCOMMA = "(/d+/,?/d*|/,/d+)";
const IUP_MASK_INT = "[+/-]?/d+";
const IUP_MASK_UINT = "/d+";
const IUPMASK_FLOAT = IUP_MASK_FLOAT;
const IUPMASK_UFLOAT = IUP_MASK_UFLOAT;
const IUPMASK_EFLOAT = IUP_MASK_EFLOAT;
const IUPMASK_INT = IUP_MASK_INT;
const IUPMASK_UINT = IUP_MASK_UINT;
const IUP_GETPARAM_BUTTON1 = -1;
const IUP_GETPARAM_INIT = -2;
const IUP_GETPARAM_BUTTON2 = -3;
const IUP_GETPARAM_BUTTON3 = -4;
const IUP_GETPARAM_CLOSE = -5;
const IUP_GETPARAM_MAP = -6;
const IUP_GETPARAM_OK = IUP_GETPARAM_BUTTON1;
const IUP_GETPARAM_CANCEL = IUP_GETPARAM_BUTTON2;
const IUP_GETPARAM_HELP = IUP_GETPARAM_BUTTON3;
const IUP_PRIMARY = -1;
const IUP_SECONDARY = -2;

export {
    IUP_ERROR,
    IUP_NOERROR,
    IUP_OPENED,
    IUP_INVALID,
    IUP_INVALID_ID,
    IUP_IGNORE,
    IUP_DEFAULT,
    IUP_CLOSE,
    IUP_CONTINUE,
    IUP_CENTER,
    IUP_LEFT,
    IUP_RIGHT,
    IUP_MOUSEPOS,
    IUP_CURRENT,
    IUP_CENTERPARENT,
    IUP_LEFTPARENT,
    IUP_RIGHTPARENT,
    IUP_TOP,
    IUP_BOTTOM,
    IUP_TOPPARENT,
    IUP_BOTTOMPARENT,
    IUP_BUTTON1,
    IUP_BUTTON2,
    IUP_BUTTON3,
    IUP_BUTTON4,
    IUP_BUTTON5,
    IUP_MASK_FLOAT,
    IUP_MASK_UFLOAT,
    IUP_MASK_EFLOAT,
    IUP_MASK_UEFLOAT,
    IUP_MASK_FLOATCOMMA,
    IUP_MASK_UFLOATCOMMA,
    IUP_MASK_INT,
    IUP_MASK_UINT,
    IUPMASK_FLOAT,
    IUPMASK_UFLOAT,
    IUPMASK_EFLOAT,
    IUPMASK_INT,
    IUPMASK_UINT,
    IUP_GETPARAM_BUTTON1,
    IUP_GETPARAM_INIT,
    IUP_GETPARAM_BUTTON2,
    IUP_GETPARAM_BUTTON3,
    IUP_GETPARAM_CLOSE,
    IUP_GETPARAM_MAP,
    IUP_GETPARAM_OK,
    IUP_GETPARAM_CANCEL,
    IUP_GETPARAM_HELP,
    IUP_PRIMARY,
    IUP_SECONDARY,

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