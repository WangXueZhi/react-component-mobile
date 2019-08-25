import React from 'react'
import Badge from './Badge'
import { Button } from 'wd-mobile'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * BadgeExample 演示案例
 * @author wang
 * @version 0.0.1
 * @description 徽标数
 */

// 样式
const containerStyle = {
  padding: "20px"
};

export default class Example extends React.PureComponent {
  state = {}

  componentDidMount() {

  }

  render() {
    return (
      <div className="x-example">
        <h1>Badge 演示</h1>
        <h3>显示一个红点</h3>
        <div style={containerStyle}>
          <Badge dot count={199}>
            <Button>新消息</Button>
          </Badge>
        </div>
        <h3>限制最大数99</h3>
        <div style={containerStyle}>
          <Badge maxCount={99} count={199}>
            <Button>待收货</Button>
          </Badge>
        </div>
        <h3>不限制数量</h3>
        <div style={containerStyle}>
          <Badge count={199}>
            <Button>已收货</Button>
          </Badge>
        </div>
        <h3>count如果是0，不显示</h3>
        <div style={containerStyle}>
          <Badge hideIfCountIsZero={true} count={0}>
            <Button>已退货</Button>
          </Badge>
        </div>
        <h3>count如果是0，依然显示</h3>
        <div style={containerStyle}>
          <Badge count={0}>
            <Button>已验货</Button>
          </Badge>
        </div>
      </div>
    )
  }
}

renderMobile(Example)