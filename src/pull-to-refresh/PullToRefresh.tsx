import * as React from 'react'
import './style/index.scss'

export class PullToRefreshProps {
  /**
   * 样式前缀
   * @ignore
   * @default 'x-pull-to-refresh'
   */
  prefixCls?: string = 'x-pull-to-refresh'
  /**
   * 是否显示刷新状态
   */
  refreshing = false;
  /**
   * 加载中回调函数
   */
  refresh?: () => void;
  /**
   * 触发刷新最小下拉距离
   */
  distance = 100;
  /**
   * 容器高度，默认高度为浏览器高度即document.documentElement.clientHeight
   */
  height = document.documentElement.clientHeight;
}

/**
 * @author wdong
 * @version 0.0.1
 */
export default class PullToRefresh extends React.PureComponent<PullToRefreshProps & React.HTMLAttributes<{}>, any> {
  static defaultProps = new PullToRefreshProps()

  constructor(props: PullToRefreshProps) {
    super(props)
    this.state = {
      text: "下拉可以刷新", //拉动刷新文案
      step: 0, //刷新状态  0无下拉或未下拉至指定位置 1下拉至大于等会指定位置 2加载中
      translateY: -50,
      overMinDistance: false,   //当前距离是否大于刷新最小距离
      doing: false  //是否处于操作状态
    }
  }

  componentDidMount(): void {
    this.addPullListenEvent();
  }

  static getDerivedStateFromProps(nextProps: PullToRefreshProps, prevState: any) {
    if (!nextProps.refreshing && prevState.step == 2) {
      //刷新完成
      return {
        step: 0,
        text: "下拉可以刷新",
        translateY: -50,
        doing: false
      }
    }
    return null
  }

  wrap: any = null;

  render() {
    const { prefixCls, height } = this.props;
    const { step, translateY, text, overMinDistance } = this.state;

    return (
      <div className={prefixCls} style={{ height: height }} ref={wrap => this.wrap = wrap}>
        <div className={step == 2 || (step == 0 && translateY == -50) ? `${prefixCls}-back` : ""} style={{ transform: `translateY(${translateY}px)` }}>
          <div className={step == 2 ? `${prefixCls}-main ${prefixCls}-doing` : `${prefixCls}-main`}>
            {overMinDistance && (step == 2 || (step == 0 && translateY == -50)) ? <div className={`${prefixCls}-text`}><i className={`${prefixCls}-loading`}></i></div> : <div className={`${prefixCls}-text`}>{text}</div>}
            {
              this.props.children
            }
          </div>
        </div>
      </div>
    )
  }

  //添加滑动事件监听
  addPullListenEvent = () => {
    let startY = 0;
    let distance = 0;
    const overscroll = (el: any) => {
      el.addEventListener('touchstart', (evt: any) => {
        let top = el.scrollTop;
        let totalScroll = el.scrollHeight;
        let currentScroll = top + el.offsetHeight;

        if (!this.state.doing) {
          this.setState({
            doing: true
          });
        }

        if (top === 0) {
          el.scrollTop = 1;
        } else if (currentScroll === totalScroll) {
          el.scrollTop = top - 1;
        }
        startY = evt.touches[0].pageY;
      });
      el.addEventListener('touchmove', (evt: any) => {
        distance = evt.touches[0].pageY - startY;

        if (distance > 0 && el.scrollTop <= 0) {
          // evt.stopPropagation();
          evt.preventDefault();
        } else {
          return;
        }

        this.setState({
          translateY: distance - 50
        });

        if (distance >= this.props.distance) {
          this.setState({
            overMinDistance: true,
            step: 1,
            text: "松开立即刷新"
          });
        }
      });

      el.addEventListener('touchend', (evt: any) => {
        if (distance > 0 && el.scrollTop <= 0) {
          evt.preventDefault();
        } else {
          return;
        }

        if (distance >= this.props.distance) {
          this.props.refresh && this.props.refresh();
          this.setState({
            step: 2,
            translateY: 0,
            overMinDistance: true
          });
        } else {
          this.setState({
            step: 0,
            text: "下拉可以刷新",
            translateY: -50,
            overMinDistance: false,
            doing: false
          });
        }
      });
    }

    if (!this.state.doing) {
      overscroll(this.wrap);
    }
  }
}