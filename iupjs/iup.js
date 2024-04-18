import { FFIType, dlopen, suffix } from "bun:ffi";
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
import { val } from "./val";
const { ptr, cstring, i32 } = FFIType;

const path = `libs/iup.${suffix}`;
export const {
    symbols: {
        IupOpen,
        IupMessage,
        IupSetGlobal,
        IupMainLoop,
        IupShow,
        IupSetCallback,
        IupSetStrAttribute,
        IupSetAttribute,
        IupGetAttribute,
        IupSetHandle,
        IupGetHandle,
        IupDialog,
        IupButton,
        IupText,
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
        IupAppend,
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
        IupSpace
    },
} = dlopen(path, {
    IupOpen: {
        args: [],
        returns: i32,
    },
    IupMessage: {
        args: [cstring, cstring],
        returns: i32,
    },
    IupSetGlobal: {
        args: [cstring, cstring],
        returns: i32,
    },
    IupMainLoop: {
        args: [],
    },
    IupDialog: {
        args: [ptr],
        returns: ptr,
    },
    IupShow: {
        args: [ptr],
        returns: i32,
    },
    IupButton: {
        args: [cstring, cstring],
        returns: ptr,
    },
    IupText: {
        args: [cstring],
        returns: ptr,
    },
    IupLabel: {
        args: [cstring],
        returns: ptr,
    },
    IupList: {
        args: [cstring],
        returns: ptr,
    },
    IupDatePick: {
        args: [],
        returns: ptr,
    },
    IupGauge: {
        args: [],
        returns: ptr,
    },
    IupProgressBar: {
        args: [],
        returns: ptr,
    },
    IupSpin: {
        args: [],
        returns: ptr,
    },
    IupToggle: {
        args: [cstring, cstring],
        returns: ptr,
    },
    IupTree: {
        args: [],
        returns: ptr,
    },
    IupVal: {
        args: [cstring],
        returns: ptr,
    },
    IupFill: {
        args: [],
        returns: ptr,
    },
    IupSpace: {
        args: [],
        returns: ptr,
    },
    IupSetHandle: {
        args: [cstring, ptr],
        returns: ptr,
    },
    IupGetHandle: {
        args: [cstring],
        returns: ptr,
    },
    IupSetCallback: {
        args: [ptr, cstring, "callback"],
        returns: ptr,
    },
    IupSetStrAttribute: {
        args: [ptr, cstring, cstring]
    },
    IupSetAttribute: {
        args: [ptr, cstring, cstring]
    },
    IupGetAttribute: {
        args: [ptr, cstring],
        returns: cstring,
    },
    IupHbox: {
        args: [...Array(100).fill(ptr)],
        returns: ptr,
    },
    IupVbox: {
        args: [...Array(100).fill(ptr)],
        returns: ptr,
    },
    IupCbox: {
        args: [...Array(100).fill(ptr)],
        returns: ptr,
    },
    IupGridBox: {
        args: [...Array(100).fill(ptr)],
        returns: ptr,
    },
    IupMultiBox: {
        args: [...Array(100).fill(ptr)],
        returns: ptr,
    },
    IupZbox: {
        args: [...Array(100).fill(ptr)],
        returns: ptr,
    },
    IupRadio: {
        args: [...Array(100).fill(ptr)],
        returns: ptr,
    },
    IupNormalizer: {
        args: [...Array(100).fill(ptr)],
        returns: ptr,
    },
    IupFrame: {
        args: [ptr],
        returns: ptr,
    },
    IupTabs: {
        args: [...Array(100).fill(ptr)],
        returns: ptr,
    },
    IupBackgroundBox: {
        args: [...Array(100).fill(ptr)],
        returns: ptr,
    },
    IupScrollBox: {
        args: [...Array(100).fill(ptr)],
        returns: ptr,
    },
    IupDetachBox: {
        args: [ptr],
        returns: ptr,
    },
    IupExpander: {
        args: [ptr],
        returns: ptr,
    },
    IupSbox: {
        args: [ptr],
        returns: ptr,
    },
    IupSplit: {
        args: [ptr, ptr],
        returns: ptr,
    },
    IupAppend: {
        args: [ptr, ptr],
        returns: ptr
    }
});

export function str(template, ...values) {
    return Buffer.from(`${template.map((component, index) => values[index] ? component + values[index] : component).join('')}\0`);
}

export class iup {
    constructor() { }

    static open() {
        IupOpen();
        IupSetGlobal(str`UTF8MODE`, str`YES`);
    }

    static mainLoop() {
        IupMainLoop();
    };
}

export {
    backgroundbox,
    button,
    cbox,
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
    toggle,
    tree,
    val,
    vbox,
    zbox
};

