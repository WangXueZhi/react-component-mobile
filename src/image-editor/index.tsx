/**
 * 图片编辑
 * @prop { Boolean } pinch 是否允许缩放 @default false
 * @prop { Boolean } rotate 是否允许旋转 @default false
 * @prop { String } className 样式名 @default ""
 * @prop { Function } cancle 取消回调
 * @prop { Function } reset 取消回调
 * @prop { Function } complete 取消回调
 * @example
 * import React from "react";
 * import ImageEditor from "wdpcCommon/image-editor";
 * export default class App extends React.Component {
 *    constructor(props) {
 *        super(props);
 *    }
 *
 *    render(){
 *        return(
 *            <ImageEditor></ImageEditor>
 *        )
 *    }
 * }
 */

import * as React from "react";
import './index.less';
import classnames from "../_util/classnames/classnames";
import * as touch from "touchjs";
import * as lrz from "lrz";

/**
 * 图片编辑配置参数。
 */
export class ImageEditorProps {
    /**
     * 样式名
     */
    className = "";
    /**
     * 是否开启缩放
     */
    pinch = false;
    /**
     * 是否开启旋转
     */
    rotate = false;
    /**
     * 取消按钮回调函数
     */
    cancle = () => { };
    /**
     * 重置按钮回调函数
     */
    reset = () => { };
    /**
     *  完成按钮回调函数
     */
    complete = () => { };

};

/**
 * 表示一个图片编辑。
 * @internal
 */
export default class ImageEditor extends React.Component<any, any> {
    static defaultProps = new ImageEditorProps();
    constructor(props) {
        super(props);
        this.state = {
            showEditor: false
        }
    }

    clipWidth: any = window.innerWidth;
    maxFileSize: number = 10;
    changeVal: any = {
        disX: 0,
        disY: 0,
        scale: 1,
        rotate: 0,
        lastX: 0,
        lastY: 0,
        initialScale: 1,
        angle: 0
    }
    currentImg: any = null;
    currentImgHeight: any = null;
    touchLayer: any = null;
    canvas: any = null;
    canvasW: any = document.documentElement.clientWidth;
    canvasH: any = document.documentElement.clientHeight;
    canvasContext: any = null;
    input: any = null;
    img: any = null;

    componentDidMount() {
        this.canvasContext = this.canvas.getContext("2d");
        this.canvasContext.translate(this.canvasW / 2, this.canvasH / 2);
        this.addImgEditHandler();
    }
    render() {
        return (
            <div className="wdmb-imageeditor">
                <div className="HeadEditor">
                    <input ref={input => this.input = input} className={this.props.className} type="file" onChange={(e) => {
                        const file = e.target.files[0];
                        if (file.size > this.maxFileSize * 1048576) {
                            alert('请上传小于' + this.maxFileSize + 'M的图片');
                            return false;
                        }
                        lrz(file)
                            .then((rst) => {
                                this.img = rst.base64;
                                this.loadImg(this.img);
                                this.setState({
                                    showEditor: true
                                })
                                document.addEventListener('touchmove', this.preventDefault, false);
                            })
                            .catch(function (err) {
                                // 处理失败会执行
                            })
                            .always(function () {
                                // 不管是成功失败，都会执行
                            });
                    }} />
                    <div className={classnames("Editor", {
                        ["show"]: this.state.showEditor
                    })}>
                        <div className="container">
                            <canvas ref={canvas => {
                                this.canvas = canvas;
                            }} width={this.canvasW} height={this.canvasH} className="canvas"></canvas>
                            <div className="cover" ref={(touchLayer) => { this.touchLayer = touchLayer }}>
                                <div style={{ height: (this.canvasH - this.clipWidth) / 2 - 50 }}></div>
                                <div style={{ height: (this.canvasH - this.clipWidth) / 2 - 50 }}></div>
                            </div>
                            <div className="btns">
                                <button onClick={() => { this.cancle() }}>取消</button>
                                <button onClick={() => { this.reset() }}>还原</button>
                                <button onClick={() => { this.complete() }}>完成</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    preventDefault(e) {
        e.preventDefault()
    }

    addImgEditHandler() {
        let currentScale;
        let onPinch = false;

        if (this.props.pinch) {
            //缩放
            touch.on(this.touchLayer, 'pinch', (ev) => {
                if (!this.currentImg) return false;
                onPinch = true;
                currentScale = ev.scale - 1;
                currentScale = this.changeVal.initialScale + currentScale;
                currentScale = currentScale > 10 ? 10 : currentScale;
                currentScale = currentScale < 0.2 ? 0.2 : currentScale;
                this.changeVal.scale = currentScale;
                this.update();
            })

            touch.on(this.touchLayer, "pinchend", (ev) => {
                if (!this.currentImg) return false;
                this.changeVal.initialScale = currentScale;
                onPinch = false;
            });
        }

        //滑动
        touch.on(this.touchLayer, "swipeend", (ev) => {
            if (!this.currentImg) return false;
            if (onPinch) return false;
            this.changeVal.disX = this.changeVal.lastX + ev.x;
            this.changeVal.disY = this.changeVal.lastY + ev.y;
            this.changeVal.lastX += ev.x;
            this.changeVal.lastY += ev.y;
            this.update();
        });
        touch.on(this.touchLayer, "swiping", (ev) => {
            if (!this.currentImg) return false;
            if (onPinch) return false;
            this.changeVal.disX = this.changeVal.lastX + ev.x;
            this.changeVal.disY = this.changeVal.lastY + ev.y;
            this.update();
        });

        if (this.props.rotate) {
            //旋转
            touch.on(this.touchLayer, "rotate", (ev) => {
                if (!this.currentImg) return false;
                //if (onPinch)return false;
                let totalAngle = this.changeVal.angle + ev.rotation;
                if (ev.fingerStatus === 'end') {
                    this.changeVal.angle = this.changeVal.angle + ev.rotation;
                }
                this.changeVal.rotate = totalAngle;
                this.update();
            });
        }
    }
    resetEdit() {
        this.canvasContext.clearRect(-1000, -1000, 2000, 2000);
        this.changeVal = {
            disX: 0,
            disY: 0,
            scale: 1,
            rotate: 0,
            lastX: 0,
            lastY: 0,
            initialScale: 1,
            angle: 0
        }
        this.currentImgHeight = 0;
    }

    loadImg(imgSrc) {
        this.resetEdit();
        let img = new Image();
        img.src = imgSrc;
        img.onload = () => {
            let _height = (this.canvasW / img.width) * img.height;
            this.currentImg = img;
            this.currentImgHeight = _height;
            this.drawImg();
        }
    }

    drawImg() {
        let scale = this.changeVal.scale;
        let disX = -this.canvasW / 2; // + this.changeVal.disX;
        let disY = -this.currentImgHeight / 2; //+ this.changeVal.disY;
        let rotate = this.changeVal.rotate * Math.PI / 180;
        this.canvasContext.save();
        this.canvasContext.translate(this.changeVal.disX, this.changeVal.disY);
        this.canvasContext.scale(scale, scale);
        this.canvasContext.rotate(rotate);
        this.canvasContext.drawImage(this.currentImg, disX, disY, this.canvasW, this.currentImgHeight);
        this.canvasContext.restore();
    }

    sliceImg() {
        let clipX = 0;
        let clipY = (this.canvasH - this.clipWidth) / 2;
        let imgData = this.canvasContext.getImageData(clipX, clipY, this.clipWidth, this.clipWidth);

        let clipCanvas = document.createElement("canvas");
        clipCanvas.width = this.clipWidth;
        clipCanvas.height = this.clipWidth;
        let clipCtx = clipCanvas.getContext("2d");
        clipCtx.putImageData(imgData, 0, 0, 0, 0, this.clipWidth, this.clipWidth);
        let base64Str = clipCanvas.toDataURL('image/png');

        return base64Str;
    }

    update() {
        this.canvasContext.clearRect(-1000, -1000, 2000, 2000);
        this.drawImg();
    }

    cancle() {
        this.input.value = null;
        this.props.cancle && this.props.cancle()
        this.setState({
            showEditor: false
        })
        document.removeEventListener('touchmove', this.preventDefault, false);
    }

    reset() {
        this.props.reset && this.props.reset()
        this.resetEdit();
        this.loadImg(this.img);
    }

    complete() {
        this.input.value = null;
        this.props.complete && this.props.complete(this.sliceImg())
        this.setState({
            showEditor: false
        })
        document.removeEventListener('touchmove', this.preventDefault, false);
    }
}
