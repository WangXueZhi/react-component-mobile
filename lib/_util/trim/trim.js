"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trim = (str) => {
    return str.replace(/(^\s*)|(\s*$)/g, '');
};
exports.default = exports.trim;
