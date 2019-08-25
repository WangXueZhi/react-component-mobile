"use strict";
/**
 * 图标
 * @prop { String } name icon名字，对应显示你要的icon图形 @default "xianshi"
 * @prop { String } color 自定义icon字体颜色
 * @prop { String } size 自定义icon字体大小
 * @prop { Function } clickEvent 点击自身事件
 * @prop { String } className 样式
 * @example
 * import React from "react";
 * import Icon from "wdpcCommon/icon";
 *
 * const style = {
 *    float: "left",
 *    width: "33.33%",
 *    textAlign: "center",
 *    padding: "10px 0"
 * };
 *
 * const nameStyle = {
 *    marginTop: "5px",
 *    fontSize: "10px",
 *    textAlign: "center"
 * };
 *
 * export default class App extends React.Component {
 *      constructor(props) {
 *          super(props);
 *          this.state = {};
 *      }
 *      render() {
 *          return(
 *              <div>
 *                <div style={style}>
 *                    <Icon name="xianshi" />
 *                    <div style={nameStyle}>xianshi</div>
 *                </div>
 *                <div style={style}>
 *                    <Icon name="yincang" />
 *                    <div style={nameStyle}>yincang</div>
 *                </div>
 *                <div style={style}>
 *                    <Icon name="chenggong" />
 *                    <div style={nameStyle}>chenggong</div>
 *                </div>
 *                <div style={style}>
 *                    <Icon name="shibai" />
 *                    <div style={nameStyle}>shibai</div>
 *                </div>
 *                <div style={style}>
 *                    <Icon name="jiazai" />
 *                    <div style={nameStyle}>jiazai</div>
 *                </div>
 *                <div style={style}>
 *                    <Icon name="youbianjiantou" />
 *                    <div style={nameStyle}>youbianjiantou</div>
 *                </div>
 *                <div style={style}>
 *                    <Icon name="zuobianjiantou" />
 *                    <div style={nameStyle}>zuobianjiantou</div>
 *                </div>
 *                <div style={style}>
 *                    <Icon name="guanbihoveranniu" />
 *                    <div style={nameStyle}>guanbihoveranniu</div>
 *                </div>
 *                <div style={style}>
 *                    <Icon name="queding" />
 *                    <div style={nameStyle}>queding</div>
 *                </div>
 *              </div>
 *          )
 *      }
 * }
 */
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classnames_1 = require("../_util/classnames/classnames");
;
;
require("./index.less");
class Icon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    render() {
        return (React.createElement("i", { className: classnames_1.default("iconfont", `icon-${this.props.name}`, {
                [this.props.className]: this.props.className
            }), style: {
                color: this.props.color,
                fontSize: this.props.size
            }, onClick: () => {
                this.props.clickEvent && this.props.clickEvent();
            }, onMouseEnter: () => {
                this.props.onMouseEnter && this.props.onMouseEnter();
            }, onMouseLeave: () => {
                this.props.onMouseLeave && this.props.onMouseLeave();
            } }));
    }
}
Icon.defaultProps = {
    className: "",
    name: "xianshi",
    color: "",
    size: "",
    clickEvent: null,
    onMouseEnter: null,
    onMouseLeave: null
};
exports.Icon = Icon;
exports.default = Icon;
