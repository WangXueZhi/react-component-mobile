import React from 'react'
import SearchBar from './SearchBar'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * SearchBarExample 演示案例
 * @author wdong
 * @version 0.0.1
 */
export default class Example extends React.PureComponent {
  state = {}

  componentDidMount() {
    document.body.style = "background-color: #fff";
  }

  render() {
    return (
      <div className="x-example" style={{ backgroundColor: "#fff", width: "100%" }}>
        <h1>SearchBar 演示</h1>

        <SearchBar placeholder="请输入搜素内容" enter={(val) => { alert(val); }} style={{ width: "95%" }} />
        <br />
        <SearchBar placeholder="限制最大输入为10" max={10} enter={(val) => { alert(val); }} style={{ width: "95%" }} />
        <br />
        <SearchBar placeholder="限制只能输入数字" rule={/^[0-9]*$/} enter={(val) => { alert(val); }} style={{ width: "95%" }} />
      </div>
    )
  }
}

renderMobile(Example)