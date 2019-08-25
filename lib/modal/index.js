"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 模态窗口
 * @prop { Boolean } show 是否显示 @default false
 * @prop { Boolean } showMask 是否显示遮罩层 @default true
 * @prop { String } ani 动画进入方向 @default "center"
 * @prop { Boolean } popup 是否popup模式 @default false
 * @prop { Function } maskClick 点击遮罩层回调
 * @prop { String } className 样式
 * @prop { String } title 标题
 * @prop { JSX.Element } children 内容
 * @prop { Array } buttons 按钮
 * @desc 组件默认会根据移动设备系统调用对应UI的弹窗
 * @example
 * import * as React from "react";
 * import Modal from "wdpcCommon/modal";
 * import Button from "wdpcCommon/button";
 *
 * export default class App extends React.Component {
 *     constructor(props) {
 *         super(props);
 *
 *         this.state = {
 *             show: false,
 *             iosshow: false
 *         };
 *     }
 *
 *     render(){
 *         return(
 *             <div>
 *                 <div>
 *                     <Button onClick={()=>{
 *                         Modal.show({
 *                             maskClick: function(){
 *                                 Modal.hide();
 *                             },
 *                             buttons: [{
 *                                 text: "确定",
 *                                 click: function(){
 *                                     alert("确定");
 *                                 }
 *                             }, {
 *                                 text: "关闭",
 *                                 click: function(){
 *                                     Modal.hide();
 *                                 }
 *                             }],
 *                             title: "123",
 *                             content: <a>123</a>
 *                         })
 *                     }}>{"Modal.show()"}</Button>
 *                 </div>
 *                 <div style={{marginTop: "10px"}}>
 *                     <Button onClick={()=>{
 *                         this.setState({
 *                             show: true
 *                         })
 *                     }}>{"<Modal></Modal>"}</Button>
 *                 </div>
 *                 <Modal show={this.state.show} maskClick={()=>{
 *                     this.setState({
 *                         show: false
 *                     })
 *                 }}>描述文字的字数尽量控制在三行 内，并且单行最右侧尽量不要是 标点符号。</Modal>
 *                 <div style={{marginTop: "10px"}}>
 *                     <Button onClick={()=>{
 *                         this.setState({
 *                             iosshow: true
 *                         })
 *                     }}>ios系统</Button>
 *                 </div>
 *                 <Modal type="ios" buttons = {[{
 *                     text: "确定",
 *                     click: ()=>{
 *                         this.setState({
 *                             iosshow: false
 *                         })
 *                     }
 *                 }]}
 *                 show={this.state.iosshow}
 *                 maskClick={()=>{
 *                     this.setState({
 *                         iosshow: false
 *                     })
 *                 }}>描述文字的字数尽量控制在三行 内，并且单行最右侧尽量不要是 标点符号。</Modal>
 *             </div>
 *         )
 *     }
 * }
 */
const React = require("react");
const ReactDOM = require("react-dom");
const ModalForAndroid_1 = require("./ModalForAndroid");
const ModalForIos_1 = require("./ModalForIos");
const device_1 = require("../_util/device/device");
class ModalIosProps extends ModalForIos_1.ModalForIosProps {
    constructor() {
        super(...arguments);
        this.type = "ios";
    }
}
class ModalAndroidProps extends ModalForAndroid_1.ModalForAndroidProps {
    constructor() {
        super(...arguments);
        this.type = "android";
    }
}
/**
 * 弹窗容器
*/
const _containers = [];
/**
 * @internal
 */
class Modal extends React.Component {
    render() {
        console.log(this.props.type);
        return (React.createElement("div", null,
            this.props.type == "android" && React.createElement(ModalForAndroid_1.ModalForAndroid, Object.assign({}, this.props), this.props.children),
            this.props.type == "ios" && React.createElement(ModalForIos_1.ModalForIos, Object.assign({}, this.props), this.props.children)));
    }
    static show(options) {
        const type = options.type || (device_1.default.android ? "android" : "ios");
        const M = type == "android" ? ModalForAndroid_1.ModalForAndroid : ModalForIos_1.ModalForIos;
        const baseProps = Object.assign({
            show: true
        }, options);
        const container = document.createElement("div");
        document.body.appendChild(container);
        _containers.push(container);
        ReactDOM.render(React.createElement(M, Object.assign({}, baseProps), options.content), container);
    }
    static hide(options) {
        const container = _containers.pop();
        if (container) {
            ReactDOM.unmountComponentAtNode(container);
            if (container.parentNode) {
                container.parentNode.removeChild(container);
            }
        }
    }
}
Modal.defaultProps = device_1.default.android ? new ModalAndroidProps() : new ModalIosProps();
exports.Modal = Modal;
exports.default = Modal;
