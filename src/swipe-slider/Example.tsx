import React from 'react'
import SwipeSlider from './SwipeSlider'
import { Button } from "wd-mobile";
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * SwipeSliderExample 演示案例
 * @author wdong
 * @version 0.0.1
 */

const list: any = [];
for (let i = 0; i < 5; i++) {
  list.push({
    text: `第${i + 1}页`
  });
}

const btnStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 10,
  backgroundColor: "transparent",
  padding: "0 20px"
}

export default class Example extends React.PureComponent {
  state = {
    list: []
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ list: list })
    }, 1000);
  }

  swiper1: any = null;
  swiper2: any = null;
  swiper3: any = null;

  render() {
    return (
      <div className="x-example">
        <h1>SwipeSlider 演示</h1>
        <h4>1.通用</h4>
        <SwipeSlider className="swiper-test" swiperOptions={{ loop: true }} init={swiper => { this.swiper1 = swiper; }}>
          <div className={`swiper-slide swiperSlide-0`}>第一页</div>
          <div className={`swiper-slide swiperSlide-1`}>第二页</div>
          <div className={`swiper-slide swiperSlide-2`}>第三页</div>
        </SwipeSlider>
        <div style={btnStyle}>
          <Button theme="info" onClick={() => {
            this.swiper1 && this.swiper1.slidePrev();
          }}>上一页</Button>
          <Button theme="info" onClick={() => {
            this.swiper1 && this.swiper1.slideNext();
          }}>下一页</Button>
        </div>
        <h4>2.垂直滚动</h4>
        <SwipeSlider className="swiper-test" style={{ height: 200 }} swiperOptions={{ loop: true, direction: "vertical" }} init={swiper => { this.swiper2 = swiper; }}>
          <div className={`swiper-slide swiperSlide-0`}>第一页</div>
          <div className={`swiper-slide swiperSlide-1`}>第二页</div>
          <div className={`swiper-slide swiperSlide-2`}>第三页</div>
        </SwipeSlider>
        <div style={btnStyle}>
          <Button theme="info" onClick={() => {
            this.swiper2 && this.swiper2.slidePrev();
          }}>上一页</Button>
          <Button theme="info" onClick={() => {
            this.swiper2 && this.swiper2.slideNext();
          }}>下一页</Button>
        </div>
        <h4>3.异步加载</h4>
        <SwipeSlider className="swiper-test" swiperOptions={{ loop: true }} init={swiper => { this.swiper3 = swiper; }}>
          {
            this.state.list.map((item: any, index: any) => <div className={`swiper-slide swiperSlide-${index}`} key={index}>{item.text}</div>)
          }
        </SwipeSlider>
        <div style={btnStyle}>
          <Button theme="info" onClick={() => {
            this.swiper3 && this.swiper3.slidePrev();
          }}>上一页</Button>
          <Button theme="info" onClick={() => {
            this.swiper3 && this.swiper3.slideNext();
          }}>下一页</Button>
        </div>
        <h5>更多配置项请参考swiper官网：https://swiper.com.cn</h5>
      </div>
    )
  }
}

renderMobile(Example)