import React from 'react'
import PullToRefresh from './PullToRefresh'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * PullToRefreshExample 演示案例
 * @author wdong
 * @version 0.0.1
 */

function initData() {
  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      id: i,
      value: `第${i + 1}行`
    });
  }
  return data;
}

export default class Example extends React.PureComponent {
  state = {
    dataSource: [],
    refreshing: false
  }

  componentDidMount() {
    this.setState({
      dataSource: initData()
    })
  }

  render() {
    return (
      <div className="x-example">
        <h1>PullToRefresh 演示</h1>
        <h4>提示：仅支持touch事件，请用移动设备打开</h4>
        <PullToRefresh
          refreshing={this.state.refreshing}
          refresh={() => {
            this.setState({ refreshing: true });
            setTimeout(() => {
              this.setState({ refreshing: false });
            }, 1000)
          }}
        >
          <ul>
            {
              this.state.dataSource.map(item => <li key={item.id} style={{ padding: "40px 0" }}>{item.value}</li>)
            }
          </ul>
        </PullToRefresh>
      </div>
    )
  }
}

renderMobile(Example)