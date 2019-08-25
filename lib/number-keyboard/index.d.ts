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
import './index.less';
/**
 * 数字键盘配置参数。
 */
export declare class NumberKeyBoardProps {
    /**
     * 是否显示
     */
    show: boolean;
    /**
     * 按键回调函数
     */
    onChange: (num: any) => void;
    /**
     * 样式名
     */
    className: string;
}
