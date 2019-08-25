import * as React from 'react'
import cls from 'classnames'
import './style/index.scss'

export class SwipeActionProps {
  /**
   * 样式前缀
   * @ignore
   * @default 'x-swipe-action'
   */
  prefixCls?: string = 'x-swipe-action';
  /**
   * 组件样式
   */
  style?: Object;
  /**
   * 左侧按钮
   */
  left?: any;
  /**
   * 右侧按钮
   */
  right?: any;
  /**
   * 左侧按钮宽度
   * @default 0
   */
  leftwidth?: number = 0;
  /**
   * 右侧按钮宽度
   * @default 0
   */
  rightwidth?: number = 0;
  /**
   * 点击按钮后自动隐藏按钮
   */
  autoClose?: Boolean;
  /**
   * 打开时回调函数
   */
  onOpen?: () => void;
  /**
   * 禁用
   */
  disabled?: Boolean;
  /**
   * 关闭时回调函数	
   */
  onClose?: () => void;
}

/**
 * @author wdong
 * @version 0.0.1
 */
export default class SwipeAction extends React.PureComponent<SwipeActionProps & React.HTMLAttributes<{}>, any> {
  static defaultProps = new SwipeActionProps()

  constructor(props: SwipeActionProps) {
    super(props)
    this.state = {
      left: 0,  //左侧定位
      swiping: false  //是否处于滑动状态
    }
  }

  //左侧按钮dom
  buttonLeft: any;
  //右侧按钮dom
  buttonRight: any;

  render() {
    const { prefixCls, ...resetProps } = this.props;
    const leftBtn = resetProps.left || [];
    const rightBtn = resetProps.right || [];

    return (
      <div className={cls(prefixCls, { [`${prefixCls}-swiping`]: this.state.swiping })} style={resetProps.style}>
        <div className={cls(`${prefixCls}-buttons`, `${prefixCls}-buttons-left`)} ref={buttonLeft => this.buttonLeft = buttonLeft}>
          {
            leftBtn.map((btn: any, index: number) => <div className={cls(`${prefixCls}-btn`)} key={index} style={btn.style} onClick={() => {
              if (resetProps.autoClose) { this.setState(({ left: 0 })) }
              btn.onPress && typeof btn.onPress === "function" && btn.onPress();
            }}>{btn.text}</div>)
          }
        </div>
        <div className={cls(`${prefixCls}-buttons`, `${prefixCls}-buttons-right`)} ref={buttonRight => this.buttonRight = buttonRight}>
          {
            rightBtn.map((btn: any, index: number) => <div className={cls(`${prefixCls}-btn`)} key={index} style={btn.style} onClick={() => {
              if (resetProps.autoClose) { this.setState(({ left: 0 })) }
              btn.onPress && typeof btn.onPress === "function" && btn.onPress();
            }}>{btn.text}</div>)
          }
        </div>
        <div className={`${prefixCls}-content`} onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd} style={{ left: this.state.left }}>
          <div style={{ paddingLeft: 15, minHeight: 44, display: "flex", alignItems: "center", overflow: "hidden" }}>{resetProps.children}</div>
        </div>
      </div>
    )
  }

  //滑动x起始位置
  positionStartX: number = 0;

  //点击时滑块是否为打开状态
  currentIsOpen: boolean = true;

  onTouchStart = (e: any) => {
    e.preventDefault();
    this.positionStartX = e.touches[0].pageX;

    this.currentIsOpen = Math.abs(this.state.left) > 0;

    this.setState({
      left: 0
    });
  }

  onTouchMove = (e: any) => {
    e.preventDefault();
    const { leftwidth, rightwidth, disabled } = this.props;
    const maxLeft = leftwidth || this.buttonLeft.clientWidth || 0;
    const minLeft = rightwidth || this.buttonRight.clientWidth || 0;
    const moveX = e.touches[0].pageX;

    //禁用
    if (disabled) {
      return;
    }

    let distance = moveX - this.positionStartX;

    if (distance > 0) {
      distance = distance > maxLeft ? maxLeft : distance;
    } else {
      distance = distance < -minLeft ? -minLeft : distance;
    }

    this.setState({
      left: distance,
      swiping: true
    });
  }

  onTouchEnd = () => {
    let distance = this.state.left;
    const { leftwidth, rightwidth, onOpen, onClose } = this.props;
    const maxLeft = leftwidth || this.buttonLeft.clientWidth || 0;
    const minLeft = rightwidth || this.buttonRight.clientWidth || 0;

    if (distance > 0) {
      distance = distance > maxLeft * 0.5 ? maxLeft : 0;
    } else {
      distance = distance < -minLeft * 0.5 ? -minLeft : 0;
    }

    if (this.currentIsOpen && distance == 0) {
      onClose && typeof onClose === "function" && onClose();
    }

    if (!this.currentIsOpen && Math.abs(distance) > 0) {
      onOpen && typeof onOpen === "function" && onOpen();
    }

    this.setState({
      swiping: false,
      left: distance
    });
  }
}