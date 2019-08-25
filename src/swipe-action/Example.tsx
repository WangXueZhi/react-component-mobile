import React from 'react'
import { List, ListItem, Icon } from 'wd-mobile'
import SwipeAction from './SwipeAction'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * SwipeActionExample 演示案例
 * @author wdong
 * @version 0.0.1
 */
export default class Example extends React.PureComponent {
  state = {}

  render() {
    return (
      <div className="x-example">
        <h1>SwipeAction 演示</h1>
        <h4>提示：仅支持touch事件，请用移动设备打开</h4>
        <List>
          <SwipeAction
            autoClose
            left={[
              {
                text: "左侧按钮1",
                onPress: () => console.log("点击了左侧按钮1"),
                style: { backgroundColor: "#768dff" }
              },
              {
                text: "左侧按钮2",
                onPress: () => console.log("点击了左侧按钮2"),
                style: { backgroundColor: "#999" }
              }
            ]}
            right={[
              {
                text: "右侧按钮1",
                onPress: () => console.log("点击了右侧按钮1"),
                style: { backgroundColor: "#768dff" }
              },
              {
                text: "右侧按钮2",
                onPress: () => console.log("点击了右侧按钮2"),
                style: { backgroundColor: "#999" }
              }
            ]}
            onClose={() => console.log("关闭了")}
            onOpen={() => console.log("打开了")}
          >
            <ListItem title="left" arrow="right" style={{ width: "100%" }} />
          </SwipeAction>
          <SwipeAction
            autoClose
            left={[
              {
                text: "左侧按钮1",
                onPress: () => console.log("点击了左侧按钮1"),
                style: { backgroundColor: "#768dff" }
              },
              {
                text: "左侧按钮2",
                onPress: () => console.log("点击了左侧按钮2"),
                style: { backgroundColor: "#999" }
              }
            ]}
            onClose={() => console.log("关闭了")}
            onOpen={() => console.log("打开了")}
          >
            <ListItem title="left" arrow="right" style={{ width: "100%" }} />
          </SwipeAction>
          <SwipeAction
            autoClose
            right={[
              {
                text: <span><Icon className="x-icon-warm" />图标</span>,
                onPress: () => console.log("点击了右侧按钮1"),
                style: { backgroundColor: "#768dff" }
              },
              {
                text: "右侧按钮2",
                onPress: () => console.log("点击了右侧按钮2"),
                style: { backgroundColor: "#999" }
              }
            ]}
            onClose={() => console.log("关闭了")}
            onOpen={() => console.log("打开了")}
          >
            <ListItem title="left" arrow="right" style={{ width: "100%" }} />
          </SwipeAction>
          <SwipeAction
            autoClose={true}
            left={[
              {
                text: "稍长一点的文案",
                onPress: () => console.log("点击了左侧按钮1"),
                style: { backgroundColor: "#768dff" }
              },
              {
                text: "左侧按钮2",
                onPress: () => console.log("点击了左侧按钮2"),
                style: { backgroundColor: "#999" }
              }
            ]}
            right={[
              {
                text: "右侧按钮1",
                onPress: () => console.log("点击了右侧按钮1"),
                style: { backgroundColor: "#768dff" }
              },
              {
                text: "文案不可以太长",
                onPress: () => console.log("这里也可以"),
                style: { backgroundColor: "#999" }
              }
            ]}
            onClose={() => console.log("关闭了")}
            onOpen={() => console.log("打开了")}
          >
            <ListItem title="left" arrow="right" style={{ width: "100%" }} />
          </SwipeAction>
        </List>
      </div>
    )
  }
}

renderMobile(Example)