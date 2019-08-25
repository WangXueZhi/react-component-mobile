/**
 * 按钮
 * @prop { String } type 类型，default | primary | warming @default default
 * @prop { Boolean } disabled 是否禁用 @default false
 * @prop { Function } onClick 点击 @default null
 * @prop { Object } style 点击 @default {}
 * @prop { Object } size 尺寸，large | small @default "large"
 * @example
 * import * as React from "react";
 * import * as ReactDOM from "react-dom";
 * import Button from "wdpcCommon/button";
 * import Toast from "wdpcCommon/toast";
 *
 * export default class App extends React.Component {
 *     constructor(props) {
 *         super(props);
 *     }
 *     render() {
 *         return (
 *             <div className="container">
 *                 <div>
 *                     <Button>默认按钮</Button>
 *                 </div>
 *                 <div style={{marginTop: "10px"}}>
 *                     <Button disabled>默认按钮</Button>
 *                 </div>
 *                 <div style={{marginTop: "10px"}}>
 *                     <Button ghost>默认幽灵按钮</Button>
 *                 </div>
 *                 <div style={{marginTop: "10px"}}>
 *                     <Button type="primary">主要按钮</Button>
 *                 </div>
 *                 <div style={{marginTop: "10px"}}>
 *                     <Button disabled type="primary">主要按钮</Button>
 *                 </div>
 *                 <div style={{marginTop: "10px"}}>
 *                     <Button ghost type="primary">主要幽灵按钮</Button>
 *                 </div>
 *                 <div style={{marginTop: "10px"}}>
 *                     <Button type="warning">警告按钮</Button>
 *                 </div>
 *                 <div style={{marginTop: "10px"}}>
 *                     <Button disabled type="warning">警告按钮</Button>
 *                 </div>
 *                 <div style={{marginTop: "10px"}}>
 *                     <Button ghost type="warning">警告幽灵按钮</Button>
 *                 </div>
 *                 <div style={{marginTop: "10px"}}>
 *                     <Button inline type="primary" style={{marginRight: "5px"}}>内联按钮</Button>
 *                     <Button inline ghost type="primary">内联幽灵按钮</Button>
 *                 </div>
 *                 <div style={{marginTop: "10px"}}>
 *                     <Button inline size="small" type="primary" style={{marginRight: "5px"}}>小号按钮</Button>
 *                     <Button inline size="small" ghost type="primary">小号幽灵按钮</Button>
 *                 </div>
 *             </div>
 *         );
 *     }
 * }
 */
import * as React from "react";
import './index.less';
export declare class ButtonProps {
    type: string;
    disabled: boolean;
    onClick: any;
    style: {};
    size: string;
}
export default class Toast extends React.PureComponent<any, any> {
    static defaultProps: ButtonProps;
    constructor(props: any);
    render(): JSX.Element;
    touchStart(): void;
    touchEnd(): void;
    onClick(): void;
}
