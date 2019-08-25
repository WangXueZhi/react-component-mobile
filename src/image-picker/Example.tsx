import React from 'react'
import { ImagePicker } from 'wd-mobile'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * ImagePickerExample 演示案例
 * @author wdong
 * @version 0.0.1
 */

export default class Example extends React.PureComponent {
  state = {}

  componentDidMount() {

  }

  render() {
    return (
      <div className="x-example">
        <h1>ImagePicker 演示</h1>
        <h2>基本使用</h2>
        <ImagePicker change={(files, type, index) => {
          console.log(files);
          console.log(type);
          console.log(index);
        }} maxLength={3} />
      </div>
    )
  }
}

renderMobile(Example)