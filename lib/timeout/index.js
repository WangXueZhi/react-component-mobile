"use strict";
/**
 * 短信倒计时
 * @prop { String } title 按钮描述 @default "点击发送"
 * @prop { String } nextTitle 重新发送描述 @default "重新发送"
 * @prop { Number} time 倒计时时间 @default 60
 * @prop { Boolean } auto 加载组件自动开始计时 @default false
 * @prop { Function } begin 计时开始时触发
 * @prop { Function } end 计时结束时触发
 * @prop { String } className 自定义样式名称
 * @prop { String } activeClass 触发时样式
 * @example
 * import * as React from "react";
 * import TimeOut from 'wdpcCommon/timeout';
 * import * as ReactDOM from "react-dom";
 *
 * export default class App extends React.Component {
 *     constructor(props) {
 *         super(props);
 *     }
 *     render() {
 *         return (
 *             <TimeOut title="点我试试" nextTitle="再点我试试" time={10} begin={()=>{ alert('ready'); return true;}} end={()=>{alert('end')}}/>
 *         );
 *     }
 * }
 */
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./index.less");
/**
 * 配置参数
 */
class TimeOutProps {
    constructor() {
        /**
         * 倒计时时间
         */
        this.time = 60;
        /**
         * 按钮描述
         */
        this.title = "点击发送";
        /**
         * 重新发送描述
         */
        this.nextTitle = "重新发送";
        /**
         * 计时开始前的事件监听 ;boolean|promise|function; true为开始 false则不开始
         */
        this.begin = () => new Promise((resolve) => resolve(true));
        /**
         * 加载组件自动开始计时 true 为自动开始 默认 false
         */
        this.auto = false;
        /**
         * 计时结束回调
         */
        this.end = () => { };
        /**
         * 自定义样式名称
         */
        this.className = "";
        /**
         * 触发时样式
         */
        this.activeClass = "";
    }
}
exports.TimeOutProps = TimeOutProps;
/**
 * 60倒计时
 * @description 60倒计时
 * @internal
 */
class TimeOut extends React.Component {
    constructor(props) {
        super(props);
        /**
         * 初始化
         */
        this.init = () => {
            // 开始事件监听
            let begin = this.props.begin;
            if (typeof begin == 'boolean') {
                if (begin) {
                    this.runTime();
                }
                return;
            }
            if (typeof begin == 'function') {
                let fn = begin();
                if (typeof fn.then == "function") {
                    fn.then((isBegin) => {
                        if (!isBegin) {
                            return;
                        }
                        this.runTime();
                    });
                }
                else {
                    if (fn) {
                        this.runTime();
                    }
                }
            }
        };
        /**
         * 计时
         */
        this.runTime = () => {
            this.setState({
                time: this.state.time - 1,
                active: true,
                count: +this.state.count
            });
            let process = window.setInterval(() => {
                this.setState({
                    time: this.state.time - 1
                });
                if (this.state.time < 0) {
                    this.setState({
                        active: false
                    });
                    window.clearInterval(process);
                    this.props.end(); // 结束回调
                }
            }, 1000);
        };
        /**
         * 点击重新发送
         */
        this.handleClick = () => {
            if (this.state.active) {
                return;
            }
            this.setState({
                time: this.props.time
            }, () => {
                this.init();
            });
        };
        this.state = {
            time: props.time,
            active: false,
            count: 0 // 请求发送次数
        };
    }
    componentDidMount() {
        if (this.props.auto) { // 自动开始
            this.init(); // 初始化
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auto != this.props.auto && nextProps.auto === true) {
            this.init();
        }
    }
    render() {
        return (React.createElement("div", { className: `x-timeOut ${this.props.className} ${this.state.active ? `${this.props.activeClass || 'active'}` : ''}`, onClick: this.handleClick }, this.state.active ? `${this.state.time}s` : (this.state.count > 0 ? this.props.nextTitle : this.props.title)));
    }
}
TimeOut.defaultProps = new TimeOutProps();
exports.default = TimeOut;
