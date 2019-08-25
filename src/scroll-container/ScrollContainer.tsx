import * as React from 'react'
import cls from 'classnames'
import './style/index.scss'

export class ScrollContainerProps {
  /**
   * 样式前缀
   * @ignore
   * @default 'x-scroll-container'
   */
  prefixCls?: string = 'x-scroll-container';
  /**
   * 触底阈值，单位像素
   */
  threshold?: number = 0;
  /**
   * 底部加载中文案
   */
  loadText?: string = "正在加载更多";
  /**
   * 显示底部文案
   */
  showScrollLoadText?: boolean = true;
  /**
   * 触底触发函数
   */
  onReachEnd?: () => void;
  /**
   * 滚动触发函数
   */
  onScroll?: (scrollTop: number) => void;
  /**
   * 节流时间间隔
   */
  throttleTime?: number = 1000;
  /**
   * 样式
   */
  style?: Object = {};
}

/**
 * @author wang
 * @version 0.0.1
 * @description 滚动容器，支持滚动到底触发
 */
export default class ScrollContainer extends React.PureComponent<ScrollContainerProps & React.HTMLAttributes<{}>, any> {
  static defaultProps = new ScrollContainerProps()

  constructor(props: ScrollContainerProps) {
    super(props)
    this.state = {};
  }

  /**
   * wrapperRef
   */
  wrapperRef: any = React.createRef();
  /**
   * containerRef
   */
  containerRef: any = React.createRef();
  /**
   * 节流标记
   */
  canRunReachEnd = true; // 节流标记

  componentDidMount(): void {
    // 添加滚动监听
    this.containerRef.current.addEventListener("scroll", this.onScroll.bind(this));
  }
  componentWillUnmount(): void {
    // 移除滚动监听
    this.containerRef.current.removeEventListener("scroll", this.onScroll);
  }

  render() {
    const { prefixCls, className, style } = this.props;

    return (
      <div className={cls(prefixCls, className)} style={style} ref={this.containerRef}>
        <div ref={this.wrapperRef}>
          {
            this.props.children
          }
          {
            !!this.props.showScrollLoadText && <div className={`${prefixCls}-loadtext`}><span>{this.props.loadText}</span></div>
          }
        </div>
      </div>
    );
  }

  // 滚动监听
  onScroll() {
    const scrollTop = this.containerRef.current.scrollTop;
    const containerHeight = this.containerRef.current.offsetHeight;
    const scrollHeight = this.containerRef.current.scrollHeight;

    // 容器高+滚动距离 > 滚动高度（容器高+最大滚动距离）- 阈值, 判定为触底
    if (containerHeight + scrollTop >= scrollHeight - this.props.threshold) {
      if (this.props.throttleTime > 0) {
        // 如果节流时间大于0
        this.throttle(this.props.onReachEnd);
      } else {
        // 如果节流时间等于0，则立即执行
        this.props.onReachEnd();
      }
    }
    // 滚动高度回调
    this.props.onScroll && this.props.onScroll(this.containerRef.current.scrollTop);
  }

  // 节流
  throttle(fn: any) {
    if (!this.canRunReachEnd) {
      return false;
    }
    fn && fn();
    this.canRunReachEnd = false;
    setTimeout(() => {
      this.canRunReachEnd = true;
    }, this.props.throttleTime);
  }
}