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
import * as ReactDOM from "react-dom";
import classnames from "../_util/classnames/classnames";
import './index.less';

export class ButtonProps {
    // 类型
    type = "default";
    // 禁用
    disabled = false;
    // 点击
    onClick = null;
    // 样式
    style = {};
    // 尺寸
    size = "large";
}

export default class Toast extends React.PureComponent<any, any>{
    static defaultProps = new ButtonProps();
    constructor(props) {
        super(props);
        this.state = {
            active: false
        };

        this.touchStart = this.touchStart.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    render() {
        return (
            <a role="button" style={this.props.style} className={classnames("wdmb-button", {
                "wdmb-button-primary": this.props.type == "primary",
                "wdmb-button-warning": this.props.type == "warning",
                "wdmb-button-small": this.props.size == "small",
                "wdmb-button-inline": !!this.props.inline,
                "wdmb-button-ghost": !!this.props.ghost,
                "wdmb-button-disabled": !!this.props.disabled,
                "wdmb-button-active": this.state.active
            })}
                onTouchStart={this.touchStart}
                onTouchEnd={this.touchEnd}
                onClick={this.onClick}
            >
                <span>{this.props.children}</span>
            </a>
        );
    }

    touchStart() {
        if (!!this.props.disabled) {
            return;
        }
        this.setState({
            active: true
        });
    }

    touchEnd() {
        this.setState({
            active: false
        });
    }

    onClick() {
        !this.props.disabled && this.props.onClick && this.props.onClick()
    }
}
