import * as React from 'react'
import cls from 'classnames'
import './style/index.scss'

export class BadgeProps {
  /**
   * 样式前缀
   * @ignore
   * @default 'x-badge'
   */
  prefixCls?: string = 'x-badge';
  /**
   * 数量
   * @default 0
   */
  count: number = 0;
  /**
  * 显示为点
  * @default false
  */
  dot: boolean = false;
  /**
  * 最大限制数量，当超过这个数量时，会以“+”显示，例如99+，0为不限制
  * @default 0
  */
  maxCount: number = 0;
  /**
  * count如果是0，是否隐藏
  * @default false
  */
  hideIfCountIsZero: boolean = false;
}

/**
 * @author wang
 * @version 0.0.1
 * @description 徽标数
 */
export default class Badge extends React.PureComponent<BadgeProps & React.HTMLAttributes<{}>, any> {
  static defaultProps = new BadgeProps();

  constructor(props: BadgeProps) {
    super(props);
    this.state = {};
  }

  componentDidMount(): void { }

  render() {
    const { prefixCls, className } = this.props;

    return (
      <span className={cls(prefixCls, className)}>
        {
          this.props.children
        }
        {
          this.props.hideIfCountIsZero && this.props.count <= 0 ? null : (
            this.props.count > 0 && this.props.dot ?
              <sup className={`${prefixCls}-dot`}></sup> :
              <sup className={`${prefixCls}-count`}>
                {
                  this.props.maxCount > 0 ? (this.props.count > this.props.maxCount ? `${this.props.maxCount}+` : this.props.count) : this.props.count
                }
              </sup>
          )
        }
      </span>
    );
  }
}