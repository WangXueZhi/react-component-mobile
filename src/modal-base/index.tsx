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
import * as React from "react";
import classnames from "../_util/classnames/classnames";

export class ModalBaseProps {
    /**
     * 是否显示
     */
    show = false;
    /**
     * 是否显示遮罩层
     */
    showMask = true;
    /**
     * 样式
     */
    className = "";
    /**
     * 动画进入方向，"top","center","bottom"
     */
    ani = "center";
    /**
     * 是否popup模式
     * @default false
     */
    popup = false;
    /**
     * 点击遮罩层回调
     */
    maskClick = function () { };
}

/**
 * @internal
 */
export class ModalBase extends React.Component<any, any> {
    static defaultProps = new ModalBaseProps();

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            display: false
        };
    }

    timmer = null;

    componentWillReceiveProps(newProps) {
        if (!newProps.show) {
            this.close();
        } else {
            this.show();
        }
    }

    componentDidMount() {
        setTimeout(() => {
            if (this.props.show) {
                this.show();
            }
        }, 0)
    }

    render() {
        return (
            <div className={classnames("wdmb-Modal", {
                [this.props.className]: this.props.className,
                "wdmb-Modal-show": this.state.display,
                "wdmb-Modal-popup": this.props.popup
            })}>
                {// 遮罩
                    this.props.showMask &&
                    <div className={classnames("wdmb-Modal-mask", {
                        "wdmb-Modal-show": this.state.show
                    })} onClick={() => {
                        this.props.maskClick && this.props.maskClick()
                    }}></div>
                }
                <div className={classnames("wdmb-Modal-wrapper", {
                    [`wdmb-Modal-ani-${this.props.ani}`]: this.props.ani,
                    "wdmb-Modal-show": this.state.show
                })}>
                    <div className={classnames("wdmb-Modal-container")}>
                        {this.props.children}
                    </div>
                </div>
            </div >
        );
    }

    // 关闭
    close() {
        if (!this.timmer) {
            this.setState({
                show: false,
            }, () => {
                this.timmer = setTimeout(() => {
                    this.setState({
                        display: false
                    })
                    this.timmer = null;
                }, 400)
            })
        }
    }

    // 显示
    show() {
        if (this.timmer) {
            clearTimeout(this.timmer);
            this.timmer = null;
        }
        this.setState({
            show: true,
            display: true
        })
    }
}

export default ModalBase;

