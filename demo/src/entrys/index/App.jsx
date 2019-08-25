/**
 * @description 示例
 */
import 'styles/base.less';
import 'styles/extra.less';
import classnames from "classnames";
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// react-router 按需加载
import ReactRouterBundleLoader from 'libraries/ReactRouterBundle';

// 按钮
        import ButtonContainer from 'bundle-loader?lazy!components/button/index.jsx';
        const Button  = ReactRouterBundleLoader(ButtonContainer);
// 图标
        import IconContainer from 'bundle-loader?lazy!components/icon/index.jsx';
        const Icon  = ReactRouterBundleLoader(IconContainer);
// 图片编辑
        import ImageEditorContainer from 'bundle-loader?lazy!components/image-editor/index.jsx';
        const ImageEditor  = ReactRouterBundleLoader(ImageEditorContainer);
// 模态窗口
        import ModalContainer from 'bundle-loader?lazy!components/modal/index.jsx';
        const Modal  = ReactRouterBundleLoader(ModalContainer);
// 基础模态窗口
        import ModalBaseContainer from 'bundle-loader?lazy!components/modal-base/index.jsx';
        const ModalBase  = ReactRouterBundleLoader(ModalBaseContainer);
// 数字键盘
        import NumberKeyboardContainer from 'bundle-loader?lazy!components/number-keyboard/index.jsx';
        const NumberKeyboard  = ReactRouterBundleLoader(NumberKeyboardContainer);
// 侧滑抽屉
        import SideDrawerContainer from 'bundle-loader?lazy!components/side-drawer/index.jsx';
        const SideDrawer  = ReactRouterBundleLoader(SideDrawerContainer);
// 开关
        import SwitchBarContainer from 'bundle-loader?lazy!components/switch-bar/index.jsx';
        const SwitchBar  = ReactRouterBundleLoader(SwitchBarContainer);
// 短信倒计时
        import TimeoutContainer from 'bundle-loader?lazy!components/timeout/index.jsx';
        const Timeout  = ReactRouterBundleLoader(TimeoutContainer);
// 轻提示
        import ToastContainer from 'bundle-loader?lazy!components/toast/index.jsx';
        const Toast  = ReactRouterBundleLoader(ToastContainer);


// 无法匹配
const NoMatch = ({ location }) => (
    <div>
        <h3>无法匹配 <code>{location.pathname}</code></h3>
    </div>
)
// 选择组件
const SelectRout = ({ location }) => (
    <div>
        <h3>请选择组件</h3>
    </div>
)

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routerHash: ""
        }
    }

    render() {
        const _this = this;
        return (
            <div>
                <header className="header">
                    <div className="header_name">React Mobile 组件库</div>
                    <div className="header_nav">
                        <ul>
                            
                        </ul>
                    </div>
                </header>
                <section className="section">
                    <div className="section_sideNav">
                        <ul>
                            <li className={classnames({"navActive":this.state.routerHash=="Button"})}><a href="#/Button">Button<span>按钮</span></a></li>
<li className={classnames({"navActive":this.state.routerHash=="Icon"})}><a href="#/Icon">Icon<span>图标</span></a></li>
<li className={classnames({"navActive":this.state.routerHash=="ImageEditor"})}><a href="#/ImageEditor">ImageEditor<span>图片编辑</span></a></li>
<li className={classnames({"navActive":this.state.routerHash=="Modal"})}><a href="#/Modal">Modal<span>模态窗口</span></a></li>
<li className={classnames({"navActive":this.state.routerHash=="ModalBase"})}><a href="#/ModalBase">ModalBase<span>基础模态窗口</span></a></li>
<li className={classnames({"navActive":this.state.routerHash=="NumberKeyboard"})}><a href="#/NumberKeyboard">NumberKeyboard<span>数字键盘</span></a></li>
<li className={classnames({"navActive":this.state.routerHash=="SideDrawer"})}><a href="#/SideDrawer">SideDrawer<span>侧滑抽屉</span></a></li>
<li className={classnames({"navActive":this.state.routerHash=="SwitchBar"})}><a href="#/SwitchBar">SwitchBar<span>开关</span></a></li>
<li className={classnames({"navActive":this.state.routerHash=="Timeout"})}><a href="#/Timeout">Timeout<span>短信倒计时</span></a></li>
<li className={classnames({"navActive":this.state.routerHash=="Toast"})}><a href="#/Toast">Toast<span>轻提示</span></a></li>

                        </ul>
                    </div>
                    <div className="section_detail">
                        <HashRouter>
                            <Switch>
                                <Route exact path="/" component={SelectRout} />
                                <Route path="/Button" render={({location})=>{
            return <Button didMount={()=>{
                if(location.pathname=="/Button" && _this.state.routerHash!=="Button"){
                    _this.setState({
                        routerHash: "Button",
                    })
                }
            }}/>
        }} />
<Route path="/Icon" render={({location})=>{
            return <Icon didMount={()=>{
                if(location.pathname=="/Icon" && _this.state.routerHash!=="Icon"){
                    _this.setState({
                        routerHash: "Icon",
                    })
                }
            }}/>
        }} />
<Route path="/ImageEditor" render={({location})=>{
            return <ImageEditor didMount={()=>{
                if(location.pathname=="/ImageEditor" && _this.state.routerHash!=="ImageEditor"){
                    _this.setState({
                        routerHash: "ImageEditor",
                    })
                }
            }}/>
        }} />
<Route path="/Modal" render={({location})=>{
            return <Modal didMount={()=>{
                if(location.pathname=="/Modal" && _this.state.routerHash!=="Modal"){
                    _this.setState({
                        routerHash: "Modal",
                    })
                }
            }}/>
        }} />
<Route path="/ModalBase" render={({location})=>{
            return <ModalBase didMount={()=>{
                if(location.pathname=="/ModalBase" && _this.state.routerHash!=="ModalBase"){
                    _this.setState({
                        routerHash: "ModalBase",
                    })
                }
            }}/>
        }} />
<Route path="/NumberKeyboard" render={({location})=>{
            return <NumberKeyboard didMount={()=>{
                if(location.pathname=="/NumberKeyboard" && _this.state.routerHash!=="NumberKeyboard"){
                    _this.setState({
                        routerHash: "NumberKeyboard",
                    })
                }
            }}/>
        }} />
<Route path="/SideDrawer" render={({location})=>{
            return <SideDrawer didMount={()=>{
                if(location.pathname=="/SideDrawer" && _this.state.routerHash!=="SideDrawer"){
                    _this.setState({
                        routerHash: "SideDrawer",
                    })
                }
            }}/>
        }} />
<Route path="/SwitchBar" render={({location})=>{
            return <SwitchBar didMount={()=>{
                if(location.pathname=="/SwitchBar" && _this.state.routerHash!=="SwitchBar"){
                    _this.setState({
                        routerHash: "SwitchBar",
                    })
                }
            }}/>
        }} />
<Route path="/Timeout" render={({location})=>{
            return <Timeout didMount={()=>{
                if(location.pathname=="/Timeout" && _this.state.routerHash!=="Timeout"){
                    _this.setState({
                        routerHash: "Timeout",
                    })
                }
            }}/>
        }} />
<Route path="/Toast" render={({location})=>{
            return <Toast didMount={()=>{
                if(location.pathname=="/Toast" && _this.state.routerHash!=="Toast"){
                    _this.setState({
                        routerHash: "Toast",
                    })
                }
            }}/>
        }} />

                            </Switch>
                        </HashRouter>
                    </div>
                </section>
            </div>
        )
    }
}

export default App;