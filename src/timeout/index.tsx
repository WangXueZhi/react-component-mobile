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

import * as React from 'react';
import './index.less';

/**
 * 配置参数
 */
export class TimeOutProps {
    /**
     * 倒计时时间
     */
    time = 60
    /**
     * 按钮描述
     */
    title = "点击发送"
    /**
     * 重新发送描述
     */
    nextTitle = "重新发送"
    /**
     * 计时开始前的事件监听 ;boolean|promise|function; true为开始 false则不开始 
     */
    begin = () => new Promise((resolve) => resolve(true))
    /**
     * 加载组件自动开始计时 true 为自动开始 默认 false
     */
    auto = false
    /**
     * 计时结束回调
     */
    end = () => { }
    /**
     * 自定义样式名称
     */
    className = ""
    /**
     * 触发时样式
     */
    activeClass = ""
}
/**
 * 60倒计时
 * @description 60倒计时
 * @internal
 */
export default class TimeOut extends React.Component<any, any> {
    static defaultProps = new TimeOutProps();
    constructor(props) {
        super(props);
        this.state = {
            time: props.time, // 倒计时时间
            active: false, // 触发状态
            count: 0 // 请求发送次数
        }
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
        return (
            <div className={`x-timeOut ${this.props.className} ${this.state.active ? `${this.props.activeClass || 'active'}` : ''}`} onClick={this.handleClick}>
                {
                    this.state.active ? `${this.state.time}s` : (this.state.count > 0 ? this.props.nextTitle : this.props.title)
                }
            </div>
        );
    }
    /**
     * 初始化
     */
    init = () => {
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
            } else {
                if (fn) {
                    this.runTime();
                }
            }
        }
    }
    /**
     * 计时
     */
    runTime = () => {
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
    }
    /**
     * 点击重新发送
     */
    handleClick = () => {
        if (this.state.active) {
            return;
        }
        this.setState({
            time: this.props.time
        }, () => {
            this.init();
        });
    }
}
