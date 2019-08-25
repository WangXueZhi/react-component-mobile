"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.less");
const React = require("react");
const classnames_1 = require("../_util/classnames/classnames");
class ModalBaseProps {
    constructor() {
        /**
         * 是否显示
         */
        this.show = false;
        /**
         * 是否显示遮罩层
         */
        this.showMask = true;
        /**
         * 样式
         */
        this.className = "";
        /**
         * 动画进入方向，"top","center","bottom"
         */
        this.ani = "center";
        /**
         * 是否popup模式
         * @default false
         */
        this.popup = false;
        /**
         * 点击遮罩层回调
         */
        this.maskClick = function () { };
    }
}
exports.ModalBaseProps = ModalBaseProps;
/**
 * @internal
 */
class ModalBase extends React.Component {
    constructor(props) {
        super(props);
        this.timmer = null;
        this.state = {
            show: false,
            display: false
        };
    }
    componentWillReceiveProps(newProps) {
        if (!newProps.show) {
            this.close();
        }
        else {
            this.show();
        }
    }
    componentDidMount() {
        setTimeout(() => {
            if (this.props.show) {
                this.show();
            }
        }, 0);
    }
    render() {
        return (React.createElement("div", { className: classnames_1.default("wdmb-Modal", {
                [this.props.className]: this.props.className,
                "wdmb-Modal-show": this.state.display,
                "wdmb-Modal-popup": this.props.popup
            }) },
            this.props.showMask &&
                React.createElement("div", { className: classnames_1.default("wdmb-Modal-mask", {
                        "wdmb-Modal-show": this.state.show
                    }), onClick: () => {
                        this.props.maskClick && this.props.maskClick();
                    } }),
            React.createElement("div", { className: classnames_1.default("wdmb-Modal-wrapper", {
                    [`wdmb-Modal-ani-${this.props.ani}`]: this.props.ani,
                    "wdmb-Modal-show": this.state.show
                }) },
                React.createElement("div", { className: classnames_1.default("wdmb-Modal-container") }, this.props.children))));
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
                    });
                    this.timmer = null;
                }, 400);
            });
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
        });
    }
}
ModalBase.defaultProps = new ModalBaseProps();
exports.ModalBase = ModalBase;
exports.default = ModalBase;
