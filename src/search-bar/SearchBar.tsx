import * as React from 'react'
import cls from 'classnames'
import './style/index.scss'

export class SearchBarProps {
  /**
   * 样式前缀
   * @ignore
   * @default 'x-search-bar'
   */
  prefixCls?: string = 'x-search-bar'
  /**
   * 内嵌样式
   */
  style?: any;
  /**
   * 容器样式名
   */
  className = '';
  /**
   * 搜索栏占位符
   */
  placeholder = '请输入搜索内容';
  /**
   * 搜索回调函数
   */
  enter: (val: any) => void;
  /**
   * 最大输入
   */
  max?: number;
  /**
   * 输入规则（正则表达式）
   */
  rule?: any;
  /**
   * 搜索清空输入
   */
  clear?: boolean;
}

/**
 * @author wdong
 * @version 0.0.1
 */
export default class SearchBar extends React.PureComponent<SearchBarProps & React.HTMLAttributes<{}>, any> {
  static defaultProps = new SearchBarProps()

  constructor(props: SearchBarProps) {
    super(props)
    this.state = {
      focus: false,
      value: '',
      osType: navigator.userAgent.toLowerCase().indexOf('android') > -1 ? 'android' : 'ios'
    }
  }

  componentDidMount(): void { }

  // static getDerivedStateFromProps(nextProps: SearchBarProps, prevState: any) {
  //   return null
  // }

  render() {
    const { prefixCls, className, style, clear } = this.props

    return (
      <div className={cls(prefixCls, className)} style={style}>
        <div className={cls(`${prefixCls}-search`, { [`${prefixCls}-search-focus`]: this.state.focus }, this.props.className)} onClick={() => {
          this.setState({ focus: true });
        }}>
          <div className={this.state.focus ? `${prefixCls}-tip ${prefixCls}-tip-left` : `${prefixCls}-tip`}>
            <i className={`${prefixCls}-tip-img`}></i>
            <span className={this.state.focus && this.state.value.length > 0 ? `${prefixCls}-placeholder ${prefixCls}-placeholder-hide` : `${prefixCls}-placeholder`}>{this.props.placeholder}</span>
          </div>
          <input onKeyDown={this.onKeyDown} value={this.state.value} type="search" onChange={this.onChange} className={`${prefixCls}-input`} />
        </div>
        {
          this.state.osType == 'ios' ? <div className={this.state.focus ? `${prefixCls}-cancle ${prefixCls}-cancle-focus` : `${prefixCls}-cancle`} onClick={() => {
            this.setState({
              focus: false
            });
          }}>取消</div> : <div className={cls(`${prefixCls}-btn`, { [`${prefixCls}-focus`]: this.state.focus })} onTouchEnd={() => {
            this.props.enter && this.props.enter(this.state.value);
            if (clear) {
              this.setState({
                value: ""
              });
            }
          }}>搜索</div>
        }
      </div>
    )
  }

  //建听输入框修改事件
  onChange = (e: any) => {
    const { max, rule } = this.props;
    let val = e.target.value;
    if (max && val.length > max) {
      return;
    }
    if (rule && Object.prototype.toString.call(rule) == "[object RegExp]" && !rule.test(val)) {
      return;
    }
    this.setState({
      value: val
    });
  }

  //监听输入框回车事件
  onKeyDown = (e: any) => {
    if (e.keyCode == 13) {
      this.props.enter && this.props.enter(this.state.value);
      if (this.props.clear) {
        this.setState({
          value: ""
        });
      }
    }
  }
}