"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classnames = (...args) => {
    let classString = [];
    args.forEach((arg, index) => {
        // 如果是字符串就直接加入classString
        if (typeof arg === "string") {
            classString.push(arg);
        }
        // 如果是对象
        if (typeof arg === "object") {
            for (const item in arg) {
                if (arg[item]) {
                    classString.push(item);
                }
            }
        }
    });
    return classString.join(" ");
};
exports.default = exports.classnames;
