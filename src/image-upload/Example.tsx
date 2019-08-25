import React from 'react'
import ImageUpload from './ImageUpload'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * ImageUploadExample 演示案例
 * @author wang
 * @version 0.0.1
 */

// 图片上传地址
const uploadUrl = "//bstreetgw.wdai.com/app/file_upload/upload_pic";

// 预设图片列表
const imgsList = [
  "https://oss.heyjie.cn/heyjie/4b1f43ab091a445485cf4aa5a1b8bde8.jpeg",
  "https://oss.heyjie.cn/heyjie/f0e808f2c67b4764ac70f717ad306e17.jpeg"
];

// 样式
const containerStyle = {
  padding: "0 20px 20px 20px"
};

export default class Example extends React.PureComponent {
  state = {}

  componentDidMount() { }

  render() {
    return (
      <div className="x-example">

        <h1>ImageUpload 演示</h1>
        <h3>最大数量限制：3</h3>
        <div style={containerStyle}>
          <ImageUpload max={3} uploadUrl={uploadUrl} onImgChange={(imgList) => {
            console.log(imgList);
          }} />
        </div>
        <h3>最大数量限制：5</h3>
        <div style={containerStyle}>
          <ImageUpload max={5} uploadUrl={uploadUrl} onImgChange={(imgList) => {
            console.log(imgList);
          }} />
        </div>
        <h3>预设图片</h3>
        <div style={containerStyle}>
          <ImageUpload imgs={imgsList} uploadUrl={uploadUrl} onImgChange={(imgList) => {
            console.log(imgList);
          }} />
        </div>
        <h3>排版，一行2张图</h3>
        <div style={containerStyle}>
          <ImageUpload rowNum={2} uploadUrl={uploadUrl} onImgChange={(imgList) => {
            console.log(imgList);
          }} />
        </div>
        <h3>排版，一行3张图</h3>
        <div style={containerStyle}>
          <ImageUpload rowNum={3} uploadUrl={uploadUrl} onImgChange={(imgList) => {
            console.log(imgList);
          }} />
        </div>
        <h3>排版，一行4张图</h3>
        <div style={containerStyle}>
          <ImageUpload rowNum={4} uploadUrl={uploadUrl} onImgChange={(imgList) => {
            console.log(imgList);
          }} />
        </div>
        <h3>排版，一行5张图</h3>
        <div style={containerStyle}>
          <ImageUpload rowNum={5} uploadUrl={uploadUrl} onImgChange={(imgList) => {
            console.log(imgList);
          }} />
        </div>
        <h3>排版，一行6张图</h3>
        <div style={containerStyle}>
          <ImageUpload rowNum={6} uploadUrl={uploadUrl} onImgChange={(imgList: string[]) => {
            console.log(imgList);
          }} />
        </div>
      </div>
    );
  }
}

renderMobile(Example);