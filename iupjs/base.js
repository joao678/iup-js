import { JSCallback } from "bun:ffi";
import { IupGetAttribute, IupSetCallback, IupSetStrAttribute, str } from "./iup";

export class base {
    constructor() {
        return new Proxy(this, {
            set(obj, prop, value) {
                if (prop !== 'handle') {
                    if (typeof value === 'function') {
                        IupSetCallback(obj.handle, str`${prop.toUpperCase()}`, new JSCallback(value, {
                            returns: "int",
                            args: new Array(10).fill('cstring'),
                        }));
                        return true;
                    }
                    IupSetStrAttribute(obj.handle, str`${prop.toUpperCase()}`, str`${value}`);
                } else {
                    obj[prop] = value;
                };

                return true;
            },

            get(obj, prop, receiver) {
                if (prop === 'handle' || obj[prop] instanceof Function) return obj[prop];
                return IupGetAttribute(obj.handle, str`${prop.toUpperCase()}`);
            }
        });
    }
}