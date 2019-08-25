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
export declare class SideDrawerProps {
    /**
     * 第几层抽屉
     */
    step: string;
    /**
     * 每一层的渲染内容
     */
    renderSteps: any[];
    /**
     * 哪一边
     * @default left
     */
    side: string;
    /**
     * 每一层宽度差
     * @default 0.2
     */
    layerDifference: number;
    /**
     * 第一层宽度
     * @default 0.9
     */
    firstLayerWidth: number;
    /**
     * 层级改变回调
     */
    stepChange: () => void;
}
export declare class SideDrawer extends React.Component<any, any> {
    static defaultProps: SideDrawerProps;
    constructor(props: any);
    timmer: any;
    drawer: any;
    componentDidMount(): void;
    componentWillReceiveProps(newProps: any): void;
    close(): void;
    show(step: any): void;
    render(): JSX.Element;
    stepChange(step: any, cb?: any): void;
}
export default SideDrawer;
