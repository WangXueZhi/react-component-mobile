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
import * as React from "react";
import './index.less';
/**
 * 表示一个轻提示。
 */
export default class Toast extends React.Component<any, any> {
    /**
     * 文字提示
     * @param message 信息
     * @param duration 延时
     * @param {Function} closeCallback 提示关闭回调函数
     */
    static info(message: string, duration: number, closeCallback: any): void;
    /**
     * 成功提示
     * @param message 信息
     * @param duration 延时
     * @param {Function} closeCallback 提示关闭回调函数
     */
    static success(message: string, duration: number, closeCallback: any): void;
    /**
     * 失败提示
     * @param message 信息
     * @param duration 延时
     * @param {Function} closeCallback 提示关闭回调函数
     */
    static fail(message: string, duration: number, closeCallback: any): void;
    /**
     * 加载提示
     * @param message 信息
     * @param duration 延时
     * @param {Function} closeCallback 提示关闭回调函数
     */
    static loading(message: string, duration: number, closeCallback: any): void;
    /**
     * 销毁
     */
    static hide(): void;
}
