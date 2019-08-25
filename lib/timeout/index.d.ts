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
import './index.less';
/**
 * 配置参数
 */
export declare class TimeOutProps {
    /**
     * 倒计时时间
     */
    time: number;
    /**
     * 按钮描述
     */
    title: string;
    /**
     * 重新发送描述
     */
    nextTitle: string;
    /**
     * 计时开始前的事件监听 ;boolean|promise|function; true为开始 false则不开始
     */
    begin: () => Promise<{}>;
    /**
     * 加载组件自动开始计时 true 为自动开始 默认 false
     */
    auto: boolean;
    /**
     * 计时结束回调
     */
    end: () => void;
    /**
     * 自定义样式名称
     */
    className: string;
    /**
     * 触发时样式
     */
    activeClass: string;
}
