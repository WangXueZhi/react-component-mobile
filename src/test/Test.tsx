import * as React from 'react'
import cls from 'classnames'
import './style/index.scss'

export class TestProps {
  /**
   * 样式前缀
   * @ignore
   * @default 'x-test'
   */
  prefixCls?: string = 'x-test'
}

/**
 * @author sayll
 * @version 0.0.1
 */
export default class Test extends React.PureComponent<TestProps & React.HTMLAttributes<{}>, any> {
  static defaultProps = new TestProps()

  constructor(props: TestProps) {
    super(props)
    this.state = {}
  }

  componentDidMount(): void {}

  // static getDerivedStateFromProps(nextProps: TestProps, prevState: any) {
  //   return null
  // }

  render() {
    const { prefixCls, className, ...resetProps } = this.props

    return (
      <div className={cls(prefixCls, className)} {...resetProps}>
        hello,word!
      </div>
    )
  }
}