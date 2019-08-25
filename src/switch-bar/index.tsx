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
import classnames from "../_util/classnames/classnames";
import Icon from "../Icon";
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

// 眼睛开关icon名字
const eyesName = ["xianshi", "yincang"];

export class SwitchBar extends React.Component<any, any> {

  static defaultProps: Props = {
    iconSize: "16px",
    iconColor: "#000",
    onChange: () => { },
    eye: false,
    disabled: false,
    textOpen: "开",
    textClose: "关",
    width: "44px",
    height: "30px",
    isOpen: true
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: this.props.isOpen || false
    }
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
    
  }

  render() {
    return (
      <div className={classnames("wdmb-Switch")} onClick={() => {

        // 不可切换
        if (this.props.disabled) {
          return
        }

        // 切换状态
        this.setState({
          isOpen: !this.state.isOpen
        })

        // 切换改变的回调
        this.props.onChange && this.props.onChange(!this.state.isOpen);
      }}>
        {// 眼睛开关
          this.props.eye &&
          <Icon className={classnames({
            "wdmb-Switch-disabled": this.props.disabled
          })} name={this.state.isOpen ? eyesName[0] : eyesName[1]} color={this.props.iconColor} size={this.props.iconSize} />
        }
        {// 普通开关
          !this.props.eye &&
          <div className={classnames("wdmb-Switch-btn", {
            "wdmb-Switch-disabled": this.props.disabled,
            "wdmb-Switch-checked": this.state.isOpen
          })} style={{ width: this.props.width + "px", height: this.props.height + "px" }}
          >
            <span className={classnames("wdmb-Switch-inner")}>
              {this.props.textOpen}
            </span>
            <span className={classnames("wdmb-Switch-inner")}>
              {this.props.textClose}
            </span>
            <div className={classnames("wdmb-Switch-bar")}></div>
          </div>
        }
      </div>
    );
  }
}

export default SwitchBar;
