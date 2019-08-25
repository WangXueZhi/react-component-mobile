"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.less");
const React = require("react");
const classnames_1 = require("../../_util/classnames/classnames");
const modal_base_1 = require("../../modal-base");
class ModalForAndroidProps extends modal_base_1.ModalBaseProps {
    constructor() {
        super(...arguments);
        /**
        * 弹窗标题
        */
        this.title = null;
        /**
        * 弹窗内容
        */
        this.children = null;
        /**
        * 按钮
        */
        this.buttons = [{
                text: "确定",
                click: function () {
                    alert("android");
                }
            }];
    }
}
exports.ModalForAndroidProps = ModalForAndroidProps;
/**
 * @internal
 */
class ModalForAndroid extends React.Component {
    /**
     * 设置按钮
     */
    setButtons() {
        let btnArr = [];
        let btnAmount = this.props.buttons.length;
        for (let i = 0; i < btnAmount; i++) {
            btnArr.push(React.createElement("button", { key: i, className: i + 1 == btnAmount ? "wdmb-ModalForAndroid-button-main" : "", onClick: () => {
                    this.props.buttons[i].click();
                } }, this.props.buttons[i].text));
        }
        return btnArr;
    }
    render() {
        const baseProps = {
            show: this.props.show,
            ani: this.props.ani,
            popup: this.props.popup,
            maskClick: this.props.maskClick,
            showMask: this.props.showMask
        };
        return (React.createElement(modal_base_1.ModalBase, Object.assign({}, baseProps),
            React.createElement("div", { className: classnames_1.default("wdmb-ModalForAndroid", {
                    [this.props.className]: this.props.className,
                }) },
                React.createElement("div", { className: "wdmb-ModalForAndroid-container" },
                    this.props.title && React.createElement("div", { className: "wdmb-ModalForAndroid-title" }, this.props.title),
                    React.createElement("div", { className: "wdmb-ModalForAndroid-content" }, this.props.children)),
                React.createElement("div", { className: "wdmb-ModalForAndroid-button" }, this.setButtons()))));
    }
}
ModalForAndroid.defaultProps = new ModalForAndroidProps();
exports.ModalForAndroid = ModalForAndroid;
exports.default = ModalForAndroid;
