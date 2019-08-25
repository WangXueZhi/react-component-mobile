import React from 'react'
import Test from './Test'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * TestExample 演示案例
 * @author sayll
 * @version 0.0.1
 */
export default class Example extends React.PureComponent {
  state = {}

  componentDidMount() {

  }

  render() {
    return (
      <div className="x-example">
        <h1>Test 演示</h1>

        <Test />
      </div>
    )
  }
}

renderMobile(Example)