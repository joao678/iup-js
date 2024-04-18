export function applyMixin(target, mixin) {
    Object.getOwnPropertyNames(mixin.prototype).forEach(name => {
        if (name !== 'constructor') target.prototype[name] = mixin.prototype[name];
    });
}