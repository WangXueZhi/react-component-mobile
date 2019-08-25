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

import "./index.less";
import * as React from "react";
import classnames from "../_util/classnames/classnames";
export class SideDrawerProps {
    /**
     * 第几层抽屉
     */
    step = "0";
    /**
     * 每一层的渲染内容
     */
    renderSteps = [];
    /**
     * 哪一边
     * @default left
     */
    side = "left";
    /**
     * 每一层宽度差
     * @default 0.2
     */
    layerDifference = 0.2;
    /**
     * 第一层宽度
     * @default 0.9
     */
    firstLayerWidth = 0.9;
    /**
     * 层级改变回调
     */
    stepChange = ()=>{};
}

export class SideDrawer extends React.Component<any, any> {
    static defaultProps = new SideDrawerProps();

    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            show: false
        };
    }

    timmer: any;
    drawer: any;

    componentDidMount() {
        setTimeout(() => {
            if (this.props.step > 0) {
                this.show(this.props.step);
            }
        }, 0)
    }

    componentWillReceiveProps(newProps) {
        if (newProps.step < 1) {
            this.close();
        } else {
            this.show(newProps.step);
        }
    }

    close() {
        if (!this.timmer) {
            this.stepChange(0, () => {
                this.timmer = setTimeout(() => {
                    this.setState({
                        show: false
                    })
                    this.timmer = null;
                }, 300)
            })
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
                this.stepChange(step)
                this.timmer = null;
            }, 0)
        })
    }

    render() {
        return (
            <div className={classnames("wdmb-Drawer", {
                "wdmb-Drawer-show": this.state.show
            })} ref={(drawer) => {
                this.drawer = drawer
            }}>
                <div className="wdmb-Drawer-Container">
                    {
                        this.props.renderSteps.map((item, index) => {
                            // 当前层级宽
                            let currentWidth = (this.props.firstLayerWidth - index * this.props.layerDifference) * 100 + "%";
                            return <div className={classnames("wdmb-Drawer-stepsContent", {
                                "wdmb-Drawer-stepShow": this.state.step > index,
                                "wdmb-Drawer-left": this.props.side == "left",
                                "wdmb-Drawer-right": this.props.side == "right"
                            })}>
                                <div className="wdmb-Drawer-mask" onClick={() => {
                                    if (index <= 0) {
                                        this.close();
                                    } else {
                                        this.stepChange(index)
                                    }
                                }}></div>
                                <div className="wdmb-Drawer-wraper" style={{ width: this.props.renderSteps.length == 1 ? "50%" : currentWidth }}>
                                    {this.props.renderSteps[index]}
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        );
    }

    stepChange(step, cb?) {
        if (step == this.state.step) {
            return;
        }
        this.setState({
            step: step
        }, () => {
            this.props.stepChange && this.props.stepChange(step)
            cb && cb()
        })
    }
}
export default SideDrawer;

