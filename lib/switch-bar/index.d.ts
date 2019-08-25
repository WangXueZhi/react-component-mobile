/**
 * 开关
 * @prop { String } textOpen 开的文本
 * @prop { String } textClose 关的文本
 * @prop { Boolean } disabled 不可点击
 * @prop { String } width 宽 @default "44px"
 * @prop { String } height 高 @default "30px"
 * @prop { String } iconColor icon颜色
 * @prop { String } iconSize icon尺寸
 * @prop { String } eye 眼睛开关
 * @prop { Function } onChange 开关改变回调
 * @prop { Boolean } isOpen 是否打开
 * @example
 * import React from "react";
 * import SwitchBar from "wdpcCommon/switch-bar";
 * export default class App extends React.Component {
 *      constructor(props) {
 *          super(props);
 *          this.state = {};
 *      }
 *      render() {
 *          return(
 *              <div>
 *                  <div className='wdmb-blank'>1/0开关：<SwitchBar textOpen="1" textClose="0"/></div>
 *                  <div className='wdmb-blank'>眼睛开关：<SwitchBar eye={true} /></div>
 *                  <div className='wdmb-blank'>不可点击：<SwitchBar disabled={true} /></div>
 *              </div>
 *          )
 *      }
 * }
 */
import * as React from "react";
import "./index.less";
export interface Props {
    iconColor?: string;
    iconSize?: string;
    onChange?: Function;
    eye?: boolean;
    disabled?: boolean;
    textOpen?: any;
    textClose?: any;
    width?: any;
    height?: any;
    isOpen?: boolean;
}
export declare class SwitchBar extends React.Component<any, any> {
    static defaultProps: Props;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default SwitchBar;
