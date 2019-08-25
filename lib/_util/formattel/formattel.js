"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let formatTel = (telephone) => {
    if (telephone == '' || telephone == null || telephone == undefined)
        return;
    return telephone.substring(0, 3) + '****' + telephone.substring(7);
};
exports.default = formatTel;
