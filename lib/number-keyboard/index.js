"use strict";
/**
 * 数字键盘
 * @prop { Boolean } show 是否显示 @default false
 * @prop { Function } onChange 按键回调函数
 * @prop { String } className 样式名
 * @example
 * import React from "react";
 * import NumberKeyBoard from "wdpcCommon/number-keyboard";
 * export default class App extends React.Component {
 *      constructor(props) {
 *          super(props);
 *          this.state = {
 *              value: '',
 *              show: false
 *          };
 *      }
 *      render() {
 *          return(
 *              <div className="container">
 *                  <input
 *                      value={this.state.value}
 *                      onFocus={() => { this.setState({ show: true }); }}
 *                  />
 *                  <NumberKeyBoard
 *                      show={this.state.show}
 *                      onChange={(num) => {
 *                          this.setState({
 *                              value: num
 *                          });
 *                      }}
 *                  ></NumberKeyBoard>
 *              </div>
 *          )
 *      }
 * }
 */
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./index.less");
const classnames_1 = require("../_util/classnames/classnames");
const delImg = require("./del.png");
const downImg = require("./down.png");
const upImg = require("./up.png");
/**
 * 数字键盘配置参数。
 */
class NumberKeyBoardProps {
    constructor() {
        /**
         * 是否显示
         */
        this.show = false;
        /**
         * 按键回调函数
         */
        this.onChange = (num) => { };
        /**
         * 样式名
         */
        this.className = "";
    }
}
exports.NumberKeyBoardProps = NumberKeyBoardProps;
;
/**
 * 表示一个数字键盘。
 * @internal
 */
class NumberKeyBoard extends React.Component {
    constructor(props) {
        super(props);
        this.value = "";
        this.keys = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "回退"
        ];
        this.state = {
            show: this.props.show
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.show != this.state.show) {
            this.setState({
                show: nextProps.show
            });
        }
    }
    render() {
        return (React.createElement("div", { className: classnames_1.default("wdmb-numberkeyboard", {
                [this.props.className]: this.props.className,
                ["show"]: this.state.show
            }) },
            React.createElement("div", { className: "NumberTop" },
                React.createElement("span", { className: "arrow-1" },
                    React.createElement("img", { src: upImg })),
                React.createElement("span", { className: "arrow-2" },
                    React.createElement("img", { src: downImg })),
                React.createElement("span", { className: "complete", onClick: () => {
                        this.setState({
                            show: false
                        });
                    } }, "\u5B8C\u6210")),
            this.setKeyBoard()));
    }
    setKeyBoard() {
        const items = [];
        for (let i = 0; i < this.keys.length; i++) {
            items.push(React.createElement("div", { key: "KeyBoardItem" + i, className: classnames_1.default("NumberKeyBoardItem", { ["NumberKeyBoardItemGray"]: this.keys[i] == '回退' || this.keys[i] == '.' }) },
                React.createElement("button", { onClick: (e) => {
                        this.click(this.keys[i]);
                        e.preventDefault();
                    } }, this.keys[i] == '回退' ? React.createElement("img", { src: delImg }) : this.keys[i])));
        }
        return items;
    }
    click(num) {
        let value = this.value;
        if (num == "回退") {
            if (value.length > 0) {
                value = value.slice(0, value.length - 1);
            }
        }
        else {
            value = value + num;
        }
        this.value = value;
        this.props.onChange && this.props.onChange(value);
    }
}
NumberKeyBoard.defaultProps = new NumberKeyBoardProps();
exports.default = NumberKeyBoard;
