import React from 'react'
import LazyLoad from './LazyLoad'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

import testImage from './bg.png';
import loadingImage from './loading.png';

/**
 * LazyLoadExample 演示案例
 * @author wdong
 * @version 0.0.1
 */

const list = [];

for (let i = 0; i < 15; i++) {
  list.push({
    text: `这是第${i + 1}行`,
    id: i
  });
}

export default class Example extends React.PureComponent {
  state = {
    list: list
  }

  render() {
    return (
      <div className="x-example">
        <h1>LazyLoad 演示</h1>
        <h2>1.基本展示</h2>
        <ul>
          {
            this.state.list.map(item => <li key={item.id} style={{ padding: '50px 0' }}>{item.text}</li>)
          }
        </ul>
        <LazyLoad offset={-500} placeholder={<img src={loadingImage} />}>
          <img src={testImage} />
        </LazyLoad>
        <h2>2.组件懒加载（仅支持简单组件）</h2>
        <LazyLoad height={500} placeholder={<div style={{ backgroundColor: "yellow", height: 500, width: 500 }}></div>} offset={-500}>
          <div style={{ backgroundColor: "red", height: 500, width: 500 }}></div>
        </LazyLoad>
      </div>
    )
  }
}

renderMobile(Example)