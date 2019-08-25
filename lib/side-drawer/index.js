"use strict";
/**
 * 侧滑抽屉
 * @prop { Number } step 第几层抽屉 @default 0
 * @prop { JSX.Element } renderSteps 重新发送描述
 * @prop { String } side 哪一边 @default "left"
 * @prop { Number } layerDifference 每一层宽度差 @default 0.2
 * @prop { Number } firstLayerWidth 第一层宽度 @default 0.9
 * @prop { Function } stepChange 层级改变回调
 * @example
 * import * as React from "react";
 * import * as ReactDOM from "react-dom";
 * import SideDrawer from "wdpcCommon/side-drawer";
 *
 * export default class App extends React.Component{
 *     constructor(props) {
 *         super(props);
 *
 *         this.state = {
 *             step: 0
 *         };
 *     }
 *
 *     render(){
 *         return(
 *             <div>
 *                 <button onClick={()=>{
 *                     this.setState({
 *                         step: 1
 *                     })
 *                 }}>弹出抽屉</button>
 *                 <SideDrawer side="right" renderSteps={[
 *                     <div onClick={()=>{
 *                         this.setState({
 *                             step : 2
 *                         })
 *                     }}>选择省</div>,
 *                     <div onClick={()=>{
 *                         this.setState({
 *                             step : 3
 *                         })
 *                     }}>选择市</div>,
 *                     <div onClick={()=>{
 *                         this.setState({
 *                             step : 0
 *                         })
 *                     }}>选择区</div>
 *                 ]} step={this.state.step}/>
 *             </div>
 *         )
 *     }
 * }
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.less");
const React = require("react");
const classnames_1 = require("../_util/classnames/classnames");
class SideDrawerProps {
    constructor() {
        /**
         * 第几层抽屉
         */
        this.step = "0";
        /**
         * 每一层的渲染内容
         */
        this.renderSteps = [];
        /**
         * 哪一边
         * @default left
         */
        this.side = "left";
        /**
         * 每一层宽度差
         * @default 0.2
         */
        this.layerDifference = 0.2;
        /**
         * 第一层宽度
         * @default 0.9
         */
        this.firstLayerWidth = 0.9;
        /**
         * 层级改变回调
         */
        this.stepChange = () => { };
    }
}
exports.SideDrawerProps = SideDrawerProps;
class SideDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            show: false
        };
    }
    componentDidMount() {
        setTimeout(() => {
            if (this.props.step > 0) {
                this.show(this.props.step);
            }
        }, 0);
    }
    componentWillReceiveProps(newProps) {
        if (newProps.step < 1) {
            this.close();
        }
        else {
            this.show(newProps.step);
        }
    }
    close() {
        if (!this.timmer) {
            this.stepChange(0, () => {
                this.timmer = setTimeout(() => {
                    this.setState({
                        show: false
                    });
                    this.timmer = null;
                }, 300);
            });
        }
    }
    // 显示
    show(step) {
        if (this.timmer) {
            clearTimeout(this.timmer);
            this.timmer = null;
        }
        this.setState({
            show: true
        }, () => {
            this.timmer = setTimeout(() => {
                this.stepChange(step);
                this.timmer = null;
            }, 0);
        });
    }
    render() {
        return (React.createElement("div", { className: classnames_1.default("wdmb-Drawer", {
                "wdmb-Drawer-show": this.state.show
            }), ref: (drawer) => {
                this.drawer = drawer;
            } },
            React.createElement("div", { className: "wdmb-Drawer-Container" }, this.props.renderSteps.map((item, index) => {
                // 当前层级宽
                let currentWidth = (this.props.firstLayerWidth - index * this.props.layerDifference) * 100 + "%";
                return React.createElement("div", { className: classnames_1.default("wdmb-Drawer-stepsContent", {
                        "wdmb-Drawer-stepShow": this.state.step > index,
                        "wdmb-Drawer-left": this.props.side == "left",
                        "wdmb-Drawer-right": this.props.side == "right"
                    }) },
                    React.createElement("div", { className: "wdmb-Drawer-mask", onClick: () => {
                            if (index <= 0) {
                                this.close();
                            }
                            else {
                                this.stepChange(index);
                            }
                        } }),
                    React.createElement("div", { className: "wdmb-Drawer-wraper", style: { width: this.props.renderSteps.length == 1 ? "50%" : currentWidth } }, this.props.renderSteps[index]));
            }))));
    }
    stepChange(step, cb) {
        if (step == this.state.step) {
            return;
        }
        this.setState({
            step: step
        }, () => {
            this.props.stepChange && this.props.stepChange(step);
            cb && cb();
        });
    }
}
SideDrawer.defaultProps = new SideDrawerProps();
exports.SideDrawer = SideDrawer;
exports.default = SideDrawer;
