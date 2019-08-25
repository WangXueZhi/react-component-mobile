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

import * as React from "react";
import './index.less';
import classnames from "../_util/classnames/classnames";
import * as delImg from "./del.png";
import * as downImg from "./down.png";
import * as upImg from "./up.png";

/**
 * 数字键盘配置参数。
 */
export class NumberKeyBoardProps {
    /**
     * 是否显示
     */
    show = false;
    /**
     * 按键回调函数
     */
    onChange = (num) => { };
    /**
     * 样式名
     */
    className = "";
};

/**
 * 表示一个数字键盘。
 * @internal
 */
export default class NumberKeyBoard extends React.Component<any, any> {
    static defaultProps = new NumberKeyBoardProps();
    constructor(props) {
        super(props);

        this.state = {
            show: this.props.show
        };
    }

    value: any = "";
    keys: Array<any> = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "回退"
    ];

    componentWillReceiveProps(nextProps) {
        if (nextProps.show != this.state.show) {
            this.setState({
                show: nextProps.show
            });
        }
    }

    render() {
        return (
            <div className={classnames("wdmb-numberkeyboard", {
                [this.props.className]: this.props.className,
                ["show"]: this.state.show
            })}>
                <div className="NumberTop">
                    <span className="arrow-1">
                        <img src={upImg} />
                    </span>
                    <span className="arrow-2">
                        <img src={downImg} />
                    </span>
                    <span className="complete" onClick={() => {
                        this.setState({
                            show: false
                        });
                    }}>完成</span></div>
                {this.setKeyBoard()}
            </div>
        );
    }

    setKeyBoard() {
        const items = [];
        for (let i = 0; i < this.keys.length; i++) {
            items.push(
                <div
                    key={"KeyBoardItem" + i}
                    className={classnames("NumberKeyBoardItem", { ["NumberKeyBoardItemGray"]: this.keys[i] == '回退' || this.keys[i] == '.' })}
                ><button onClick={(e) => {
                    this.click(this.keys[i]);
                    e.preventDefault();
                }}>{this.keys[i] == '回退' ? <img src={delImg} /> : this.keys[i]}</button></div >
            )
        }
        return items;
    }

    click(num) {
        let value = this.value;
        if (num == "回退") {
            if (value.length > 0) { value = value.slice(0, value.length - 1); }
        } else {
            value = value + num;
        }

        this.value = value;

        this.props.onChange && this.props.onChange(value);
    }
}
