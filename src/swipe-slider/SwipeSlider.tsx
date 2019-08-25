import * as React from 'react'
import './style/index.scss'
import Swiper from 'swiper';
import cls from 'classnames'
import "swiper/dist/css/swiper.css";

//常用swiper配置项
interface SwiperOptions {
  /**
   * Slides的滑动方向，可设置水平(horizontal)或垂直(vertical);
   * @default horizontal
   */
  direction?: string;
  /**
   * 滑动速度
   * @default 300
   */
  speed?: number;
  /**
   * 自动切换的时间间隔
   * @default 0
   */
  autoplay?: number;
  /**
   * 增加类名'swiper-no-swiping'，使该slide无法拖动
   * @default true
   */
  noSwiping?: boolean;
  /**
   * 不可拖动块的类名
   * @default swiper-no-swiping
   */
  noSwipingClass?: string;
  /**
   * 分页器容器
   */
  pagination?: string | Element;
  /**
   * 前进按钮
   */
  nextButton?: string | Element;
  /**
   * 后退按钮
   */
  prevButton?: string | Element;
  /**
   * 是否循环
   * @default false
   */
  loop?: boolean;
}

export class SwipeSliderProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 容器样式
   */
  style?: any;
  /**
   * 数据源
   */
  datasource: any = [];
  /**
   * swiper配置参数
   */
  swiperOptions?: SwiperOptions;
  /**
   * 初始化完成回调函数，返回swiper对象
   */
  init?: (swiper: any) => void
}

/**
 * @author wdong
 * @version 0.0.1
 */
export default class SwipeSlider extends React.PureComponent<SwipeSliderProps & React.HTMLAttributes<{}>, any> {
  static defaultProps = new SwipeSliderProps()

  constructor(props: SwipeSliderProps) {
    super(props)
    this.state = {}
  }

  swiper: any = null;

  isInit: boolean = false;

  componentDidMount(): void { }

  componentDidUpdate() {
    if (this.props.children && this.props.children.length > 0 && !this.isInit) {
      this.isInit = true;
      this.initSwiper();
    }
  }

  render() {
    const { children, style, className } = this.props;
    return (
      <div className={cls("swiper-container", className)} style={style} ref={swiper => this.swiper = swiper}>
        <div className="swiper-wrapper">
          {children}
        </div>
      </div>
    )
  }

  initSwiper = () => {
    const { swiperOptions, init } = this.props;
    this.swiper = new Swiper(this.swiper, { ...swiperOptions });
    if (init && typeof (init) === 'function') {
      init(this.swiper);
    }
  }
}