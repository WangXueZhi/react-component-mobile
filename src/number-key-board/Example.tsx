import React from 'react'
import NumberKeyBoard from './NumberKeyBoard'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * NumberKeyBoardExample 演示案例
 * @author wdong
 * @version 0.0.1
 */
export default class Example extends React.PureComponent {
  state = {
    showNumberKeyBoard: false,
    value: ""
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="x-example">
        <h1>NumberKeyBoard 演示</h1>
        <input onFocus={() => this.setState({ showNumberKeyBoard: true })} value={this.state.value} />

        <NumberKeyBoard
          show={this.state.showNumberKeyBoard}
          number={(num) => { this.setState({ value: this.state.value + num }) }}
          delete={() => { this.setState({ value: this.state.value.slice(0, this.state.value.length - 1) }) }}
          empty={() => { this.setState({ value: "" }) }}
        />
      </div>
    )
  }
}

renderMobile(Example)