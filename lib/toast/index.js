"use strict";
/**
 * 轻提示
 * @static { Function } info 显示 @param { String } message 消息 @param { Number } duration 持续时间 @param { Function } closeCallback 回调方法
 * @static { Function } success 成功提示 @param { String } message 消息 @param { Number } duration 持续时间 @param { Function } closeCallback 回调方法
 * @static { Function } fail 失败提示 @param { String } message 消息 @param { Number } duration 持续时间 @param { Function } closeCallback 回调方法
 * @static { Function } loading 等待提示 @param { String } message 消息 @param { Number } duration 持续时间 @param { Function } closeCallback 回调方法
 * @static { Function } hide 关闭提示
 * @example
 * import * as React from "react";
 * import * as ReactDOM from "react-dom";
 * import Toast from "wdpcCommon/toast";
 *
 * export default class App extends React.Component {
 *     constructor(props) {
 *         super(props);
 *         this.state = {
 *             value: '',
 *             show: false
 *         };
 *     }
 *     render() {
 *         return (
 *             <div className="container">
 *                 <button onClick={() => {
 *                     Toast.info('最长长长长长长文案不超过十六个字', 1000, () => { alert('提示完成'); });
 *                 }}>文案提示</button>
 *                 <button onClick={() => {
 *                     Toast.success('成功提示', 1000);
 *                 }}>成功提示</button>
 *                 <button onClick={() => {
 *                     Toast.fail('失败提示', 1000);
 *                 }}>失败提示</button>
 *                 <button onClick={() => {
 *                     Toast.loading('加载中...', 1000);
 *                 }}>加载提示1</button>
 *                 <button onClick={() => {
 *                     Toast.loading();
 *                 }}>加载提示2</button>
 *             </div>
 *         );
 *     }
 * }
 */
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
require("./index.less");
const modal_base_1 = require("../modal-base");
/**
 * 轻提示容器
*/
const _containers = [];
let setToast = (type, message) => {
    return (React.createElement(modal_base_1.ModalBase, { show: true, showMask: false },
        type == 'info' && React.createElement("div", { className: "wdmb-toast-info" }, message),
        type == 'success' && React.createElement("div", { className: "wdmb-toast-spe wdmb-toast-success" },
            React.createElement("i", null),
            message),
        type == 'fail' && React.createElement("div", { className: "wdmb-toast-spe wdmb-toast-fail" },
            React.createElement("i", null),
            message),
        type == 'loading' && message.length > 0 && React.createElement("div", { className: "wdmb-toast-spe wdmb-toast-loading-1" },
            React.createElement("i", null),
            message),
        type == 'loading' && message.length <= 0 && React.createElement("div", { className: "wdmb-toast-spe wdmb-toast-loading-2" },
            React.createElement("i", null))));
};
let show = (type, message) => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    _containers.push(container);
    ReactDOM.render(React.createElement("div", { className: "wdmb-toast" }, setToast(type, message)), container);
};
let hide = (duration, callback) => {
    setTimeout(() => {
        const container = _containers.pop();
        if (container) {
            ReactDOM.unmountComponentAtNode(container);
            if (container.parentNode) {
                container.parentNode.removeChild(container);
            }
        }
        callback && callback();
    }, duration);
};
/**
 * 表示一个轻提示。
 */
class Toast extends React.Component {
    /**
     * 文字提示
     * @param message 信息
     * @param duration 延时
     * @param {Function} closeCallback 提示关闭回调函数
     */
    static info(message = "", duration = 1500, closeCallback) {
        show("info", message);
        hide(duration, closeCallback);
    }
    /**
     * 成功提示
     * @param message 信息
     * @param duration 延时
     * @param {Function} closeCallback 提示关闭回调函数
     */
    static success(message = "", duration = 1500, closeCallback) {
        show("success", message);
        hide(duration, closeCallback);
    }
    /**
     * 失败提示
     * @param message 信息
     * @param duration 延时
     * @param {Function} closeCallback 提示关闭回调函数
     */
    static fail(message = "", duration = 1500, closeCallback) {
        show("fail", message);
        hide(duration, closeCallback);
    }
    /**
     * 加载提示
     * @param message 信息
     * @param duration 延时
     * @param {Function} closeCallback 提示关闭回调函数
     */
    static loading(message = "", duration = 1500, closeCallback) {
        show("loading", message);
        hide(duration, closeCallback);
    }
    /**
     * 销毁
     */
    static hide() {
        _containers.forEach(container => {
            if (container) {
                ReactDOM.unmountComponentAtNode(container);
                if (container.parentNode) {
                    container.parentNode.removeChild(container);
                }
            }
        });
    }
}
exports.default = Toast;
