import React from 'react'
import Pagination from './Pagination'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * PaginationExample 演示案例
 * @author wdong
 * @version 0.0.1
 */
export default class Example extends React.PureComponent {
  state = {
    loading: false
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="x-example">
        <h1>Pagination 演示</h1>
        <h2>1.基本使用</h2>
        <Pagination current={1} total={5} disable={this.state.loading} onChange={(index: any) => {
          console.log("当前翻页：" + index);
          this.setState({
            loading: true
          });
          setTimeout(() => {
            this.setState({
              loading: false
            });
          }, 1000);
        }} />
        <h2>2.指定当前翻页</h2>
        <Pagination current={5} total={5} onChange={(index: any) => {
          console.log("当前翻页：" + index);
        }} />
      </div>
    )
  }
}

renderMobile(Example)