import * as React from 'react'
import cls from 'classnames'
import { Icon, TouchFeedback, ButtonGroup, ButtonGroupProps } from 'wd-mobile'
import './style/index.scss'

/**
 * @author tongxiaokang
 * @version 0.0.1
 *
 * 实现了 [TouchFeedback](#/Components/TouchFeedback) 组件所有的API。
 */
export default class Button extends React.PureComponent<ButtonProps, any> {
  static defaultProps = {
    prefixCls: 'x-button',
    type: 'button',
    theme: 'text',
    radius: false,
    inline: false,
    loading: false,
    disabled: false,
    __type__: 'button' // 用于Form 组件区分组件类型
  }

  render() {
    const {
      prefixCls, size, loadingIcon, theme, disabled, onClick, radius,
      activeStyle, activeClassName, loading, inline, href,
      className, children, type, ...resetProps
    } = this.props

    return (
      <TouchFeedback
        disabled={disabled || loading}
        activeStyle={activeStyle}
        activeClassName={activeClassName}
      >
        <a
          href={href || 'javascript:;'}
          onClick={this.handleClick}
          className={cls(className, prefixCls, size, {
            'x-radius': radius,
            'x-dis-inline-block': inline,
            [`x-${theme}`]: theme,
            'x-disabled': disabled || loading
          })}
          {...resetProps}
        >
          {!loading ? null
            : (loadingIcon || <Icon style={{ marginRight: '.5rem' }} className={'x-icon-loading'} spin />)
          }
          {children}
        </a>
      </TouchFeedback>
    )
  }

  /**
   * ButtonGroup组件
   * @public
   * */
  static Group(props: ButtonGroupProps) {
    return <ButtonGroup {...props} />
  }

  handleClick = (e: React.MouseEvent) => {
    const { onClick, disabled, loading } = this.props

    if (disabled || loading) { // 禁用跳转
      e.preventDefault()
    }
    else {
      onClick && onClick(e)
    }
  }
}

export interface ButtonProps extends React.HTMLAttributes<{}> {
  /**
   * 样式前缀
   * @ignore
   */
  prefixCls?: string

  /**
   * 按钮主题
   * @default "text"
   * */
  theme?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'text'

  /**
   * 按钮类型
   * @default "button"
   * */
  type?: 'button' | 'submit' | 'reset'

  /**
   * 按钮大小
   * */
  size?: 'small' | 'large'

  /**
   * 跳转地址，当 a 标签使用
   * */
  href?: string

  /**
   * 设置为行内按钮
   * @default false
   * */
  inline?: boolean

  /**
   * 按钮圆角
   * @default false
   * */
  radius?: boolean

  /**
   * 禁用按钮
   * @default false
   * */
  disabled?: boolean

  /**
   * 是否加载中状态
   * @default false
   * */
  loading?: boolean

  /**
   * 加载状态的Icon
   * */
  loadingIcon?: React.ReactNode

  /**
   * 点击反馈的自定义类名
   * @default "x-active"
   * */
  activeClassName?: string

  /**
   * 点击反馈的自定义类名
   * @default "x-active"
   * */
  activeStyle?: any

  /** 点击回调 */
  onClick?: React.EventHandler<React.MouseEvent>
}