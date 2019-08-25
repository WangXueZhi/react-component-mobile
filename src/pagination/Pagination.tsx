import * as React from 'react'
import cls from 'classnames'
import './style/index.scss'

export class PaginationProps {
  /**
   * 样式前缀
   * @ignore
   * @default 'x-pagination'
   */
  prefixCls?: string = 'x-pagination';
  /**
   * 类名
   * 
   */
  className?: string;
  /**
   * 上一页按钮文案
   */
  prevText = "上一页";
  /**
   * 下一页按钮文案
   */
  nextText = "下一页";
  /**
   * 当前页号
   */
  current = 1;
  /**
   * 总页数
   */
  total = 10;
  /**
   * 当前按钮是否不可用
   */
  disable = false;
  /**
   * change事件回调函数
   */
  onChange?: (pageIndex: number) => void
}

/**
 * @author wdong
 * @version 0.0.1
 */
export default class Pagination extends React.PureComponent<PaginationProps & React.HTMLAttributes<{}>, any> {
  static defaultProps = new PaginationProps()

  constructor(props: PaginationProps) {
    super(props)
    this.state = {
      active: this.props.current
    }
  }

  componentDidMount(): void {}

  // static getDerivedStateFromProps(nextProps: PaginationProps, prevState: any) {
  //   return null
  // }

  render() {
    const { prefixCls, className, disable } = this.props

    return (
      <div className={cls(prefixCls, className)}>
        <div className={`${prefixCls}-item`}><span className={this.state.active == 1 || disable ? `${prefixCls}-btn ${prefixCls}-btn-disable` : `${prefixCls}-btn`} onClick={this.clickPrev}>{this.props.prevText}</span></div>
        <div className={`${prefixCls}-item`}><span className={`${prefixCls}-page`}>{this.state.active} / {this.props.total}</span></div>
        <div className={`${prefixCls}-item`}><span className={this.state.active == this.props.total || disable ? `${prefixCls}-btn ${prefixCls}-btn-disable` : `${prefixCls}-btn`} onClick={this.clickNext}>{this.props.nextText}</span></div>
      </div>
    )
  }

  //上一页点击回调
  clickPrev = () => {
    if (this.props.disable) {
      return;
    }
    
    if (this.state.active == 1) {
      return;
    }

    let active = this.state.active;

    active -= 1;

    this.props.onChange && this.props.onChange(active);

    this.setState({
      active: active
    });
  }

  //下一页点击回调
  clickNext = () => {
    if (this.props.disable) {
      return;
    }
    if (this.state.active == this.props.total) {
      return;
    }

    let active = this.state.active;

    active += 1;

    this.props.onChange && this.props.onChange(active);

    this.setState({
      active: active
    });
  }
}