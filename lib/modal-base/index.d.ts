/**
 * 基础模态窗口
 * @prop { Boolean } show 是否显示 @default false
 * @prop { Boolean } showMask 是否显示遮罩层 @default true
 * @prop { String } ani 动画进入方向 @default "center"
 * @prop { Boolean } popup 是否popup模式 @default false
 * @prop { Function } maskClick 点击遮罩层回调
 * @prop { String } className 样式
 * @example
 * import React from "react";
 * import ModalBase from "wdpcCommon/modal-base";
 * export default class App extends React.Component {
 *    constructor(props) {
 *        super(props);
 *
 *        this.state = {
 *            show: false
 *        };
 *    }
 *
 *    render(){
 *        return(
 *            <div>
 *                <button onClick={()=>{
 *                    this.setState({
 *                        show: true
 *                    })
 *                }}>点击显示</button>
 *                <ModalBase show={this.state.show} maskClick={()=>{
 *                    this.setState({
 *                        show: false
 *                    })
 *                }}>模态窗口容器，可完全自定义封装</ModalBase>
 *            </div>
 *        )
 *    }
 * }
 */
import "./index.less";
export declare class ModalBaseProps {
    /**
     * 是否显示
     */
    show: boolean;
    /**
     * 是否显示遮罩层
     */
    showMask: boolean;
    /**
     * 样式
     */
    className: string;
    /**
     * 动画进入方向，"top","center","bottom"
     */
    ani: string;
    /**
     * 是否popup模式
     * @default false
     */
    popup: boolean;
    /**
     * 点击遮罩层回调
     */
    maskClick: () => void;
}
export default ModalBase;
