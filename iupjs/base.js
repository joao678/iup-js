import { randomUUID } from "crypto";
import { FFIType, dlopen, suffix, JSCallback, CString, read } from "bun:ffi";
import { IupGetAttribute, IupGetHandle, IupSetCallback, IupSetHandle, IupSetStrAttribute, str } from "./iup";
const { ptr, cstring, i32 } = FFIType;

export class base {
    handle = null;

    static fromHandle(handle) {
        const tempObj = new base();
        Object.defineProperty(tempObj, 'handle', {
            value: handle,
            writable: true,
        });
        Object.defineProperties(tempObj, Object.getOwnPropertyDescriptors(this.prototype));
        return tempObj;
    }

    static fromHandleName(handleName) {
        const tempObj = new base();
        Object.defineProperty(tempObj, 'handle', {
            value: IupGetHandle(str`${handleName}`),
            writable: true,
        });
        Object.defineProperties(tempObj, Object.getOwnPropertyDescriptors(this.prototype));
        return tempObj;
    }

    // callback for all controls, by default we assume the callback is 10 strings
    getCallbackParams(eventName) {
        let args = null;

        switch (eventName) {
            case 'map_cb':
            case 'unmap_cb':
            case 'destroy_cb':
            case 'ldestroy_cb':
            case 'getfocus_cb':
            case 'killfocus_cb':
            case 'enterwindow_cb':
            case 'leavewindow_cb':
            case 'action':
            case 'help_cb':
                args = ['ptr']
                break;
            case 'k_any':
                args = ['ptr', 'i32']
                break;
            case 'button_cb':
                args = ['ptr', 'i32', 'i32', 'i32', 'i32', 'cstring']
                break;
            case 'motion_cb':
                args = ['ptr', 'i32', 'i32', 'cstring']
                break;
            case 'wheel_cb':
                args = ['ptr', 'f32', 'i32', 'i32', 'cstring']
                break;
            default:
                args = new Array(10).fill('cstring')
                break;
        }

        return args;
    }

    constructor() {
        return new Proxy(this, {
            set(obj, prop, value) {
                if (prop !== 'handle') {
                    // setting the attribute of a control to a function callback
                    if (typeof value === 'function') {
                        IupSetCallback(obj.handle, str`${prop.toUpperCase()}`, new JSCallback(function() {
                            // this is a wrapper around some argument types like pointers and strings, as they need different treatment
                            const args = Array.from(arguments).map((arg, index) => {
                                switch (obj.getCallbackParams(prop)[index]) {
                                    case 'ptr':
                                        return obj.constructor.fromHandle(arg)
                                    case 'cstring':
                                        return new CString(arg).toString()
                                    default:
                                        return arg
                                }
                            });
                            value(...args);
                        }, {
                            args: obj.getCallbackParams(prop),
                            returns: "int",
                        }).ptr);
                        return true;
                    }

                    // setting the attribute of a control to another control, such as a menu in a dialog
                    if (typeof value === 'object' && !Array.isArray(value) && value !== null && value.hasOwnProperty('handle')) {
                        const uuid = randomUUID();
                        IupSetHandle(str`${uuid}`, value.handle);
                        IupSetStrAttribute(obj.handle, str`${prop.toUpperCase()}`, str`${uuid}`);
                        return true;
                    }

                    // setting the attribute of a control to a string by default
                    IupSetStrAttribute(obj.handle, str`${prop.toUpperCase()}`, str`${value}`);
                } else {
                    // the "handle" value
                    obj[prop] = value;
                };

                return true;
            },

            get(obj, prop, receiver) {
                if (prop === 'handle' || obj[prop] instanceof Function) return Reflect.get(...arguments);

                if (prop === 'wid') return dlopen(`libs/iup.dll`, { IupGetAttribute: { args: [ptr, cstring], returns: i32, } }).symbols.IupGetAttribute(obj.handle, str`${prop.toUpperCase()}`);

                return IupGetAttribute(obj.handle, str`${prop.toUpperCase()}`).toString();
            }
        });
    }
}