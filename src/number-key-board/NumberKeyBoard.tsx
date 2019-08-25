import * as React from 'react'
import cls from 'classnames'
import './style/index.scss'

export class NumberKeyBoardProps {
  /**
   * 样式前缀
   * @ignore
   * @default 'x-number-key-board'
   */
  prefixCls?: string = 'x-number-key-board';
  /**
   * 显示数字键盘
   */
  show?: boolean = false;
  /**
   * 回调函数-输入
   */
  number?: (num: number) => void
  /**
   * 回调函数-回退
   */
  delete?: () => void
  /**
   * 回调函数-清空
   */
  empty?: () => void
}

/**
 * @author wdong
 * @version 0.0.1
 */
export default class NumberKeyBoard extends React.PureComponent<NumberKeyBoardProps & React.HTMLAttributes<{}>, any> {
  static defaultProps = new NumberKeyBoardProps()

  constructor(props: NumberKeyBoardProps) {
    super(props)
    this.state = {}
  }

  keys = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, "清空", 0, "回退"
  ];

  componentDidMount(): void { }

  // static getDerivedStateFromProps(nextProps: NumberKeyBoardProps, prevState: any) {
  //   return null
  // }

  render() {
    const { prefixCls, className, show } = this.props

    return (
      <div className={cls(prefixCls, className, { [`${prefixCls}-show`]: show })}>
        {this.setKeyBoard()}
      </div>
    )
  }

  setKeyBoard = () => {
    const { prefixCls } = this.props;
    const items = [];
    for (let i = 0; i < this.keys.length; i++) {
      items.push(
        <div
          key={"KeyBoardItem" + i}
          className={`${prefixCls}-item`}
        ><button onTouchEnd={() => {
          this.click(this.keys[i]);
        }}>{this.keys[i]}</button></div >
      )
    }
    return items;
  }

  click = (num: any) => {
    if (num == "回退") {
      typeof this.props.delete === 'function' && this.props.delete();
    }
    else if (num == "清空") {
      typeof this.props.empty === 'function' && this.props.empty();
    }
    else {
      typeof this.props.number === 'function' && this.props.number(num);
    }
  }
}