import * as React from 'react'
import LazyLoad from 'react-lazyload';
import './style/index.scss'

export class lazyLoadProps {
  /**
   * 样式前缀
   * @ignore
   * @default 'x-lazy-load'
   */
  prefixCls?: string = 'x-lazy-load';
  /**
   * 滚动容器，未指定则为当前页面窗口
   */
  scrollContainer?: any;
  /**
   * 内容高度
   */
  height?: number | string;
  /**
   * 仅进行一次懒加载
   */
  once?: boolean = false;
  /**
   * 懒加载偏移量
   */
  offset?: number = 0;
  /**
   * 占位符
   */
  placeholder?: string | React.ReactNode;
}

/**
 * @author wdong
 * @version 0.0.1
 */
export default class lazyLoad extends React.PureComponent<lazyLoadProps & React.HTMLAttributes<{}>, any> {
  static defaultProps = new lazyLoadProps()

  constructor(props: lazyLoadProps) {
    super(props)
    this.state = {}
  }

  componentDidMount(): void { }

  // static getDerivedStateFromProps(nextProps: SearchBarProps, prevState: any) {
  //   return null
  // }

  render() {
    const { prefixCls, className, children, ...resetProps } = this.props
    
    return (
      <LazyLoad {...resetProps}>{children}</LazyLoad>
    )
  }
}