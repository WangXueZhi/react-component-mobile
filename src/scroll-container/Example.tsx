import React from 'react'
import ScrollContainer from './ScrollContainer'
import { Toast } from 'wd-mobile'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'
import { hide } from 'tools/dom';

/**
 * ScrollContainerExample 演示案例
 * @author wang
 * @version 0.0.1
 */

const containerStyle = {
  position: "relative",
  width: "80%",
  height: "300px",
  margin: "0 auto"
}

export default class Example extends React.PureComponent {
  state = {}

  componentDidMount() {

  }

  render() {
    return (
      <div className="x-example">
        <h1>ScrollContainer 演示</h1>
        <h3>设置底部加载中文案</h3>
        <div style={containerStyle}>
          <ScrollContainer loadText={"呦，到底部了嘿！"}>
            <div>
              这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容
          </div>
          </ScrollContainer>
        </div>
        <h3>触底触发</h3>
        <div style={containerStyle}>
          <ScrollContainer onReachEnd={() => {
            Toast.info("到达底部！")
          }}>
            <div>
              这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容这是文章内容
            </div>
          </ScrollContainer>
        </div>
      </div>
    )
  }
}

renderMobile(Example)