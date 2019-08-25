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
import * as React from "react";
import * as ReactDOM from "react-dom";
import classnames from "../_util/classnames/classnames";
import { ModalForAndroid, ModalForAndroidProps } from "./ModalForAndroid";
import { ModalForIos, ModalForIosProps } from "./ModalForIos";
import device from "../_util/device/device";

class ModalIosProps extends ModalForIosProps {
    type = "ios";
}

class ModalAndroidProps extends ModalForAndroidProps {
    type = "android";
}

/** 
 * 弹窗容器
*/
const _containers = [];

/**
 * @internal
 */
export class Modal extends React.Component<any, any> {
    static defaultProps = device.android ? new ModalAndroidProps() : new ModalIosProps();

    render() {
        console.log(this.props.type)
        return (
            <div>
                {
                    this.props.type == "android" && <ModalForAndroid {...this.props}>
                        {this.props.children}
                    </ModalForAndroid>
                }
                {
                    this.props.type == "ios" && <ModalForIos {...this.props}>
                        {this.props.children}
                    </ModalForIos>
                }
            </div>

        );
    }

    static show(options) {
        const type = options.type || (device.android ? "android" : "ios");

        const M = type == "android" ? ModalForAndroid : ModalForIos;

        const baseProps = Object.assign({
            show: true
        }, options);

        const container = document.createElement("div");
        document.body.appendChild(container);
        _containers.push(container);

        ReactDOM.render(
            <M {...baseProps}>{options.content}</M>,
            container
        );
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

export default Modal;

