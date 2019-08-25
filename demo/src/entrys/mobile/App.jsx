/**
 * @description 示例
 */
import 'styles/base.less';
import 'styles/extra.less';
import './style.less';
import classnames from "classnames";
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Button from "wdpcCommon/button";
// react-router 按需加载
import ReactRouterBundleLoader from 'libraries/ReactRouterBundle';

// 按钮
        import ButtonContainer from 'bundle-loader?lazy!components/button/mobile.jsx';
        const ButtonRouter  = ReactRouterBundleLoader(ButtonContainer);
// 图标
        import IconContainer from 'bundle-loader?lazy!components/icon/mobile.jsx';
        const IconRouter  = ReactRouterBundleLoader(IconContainer);
// 图片编辑
        import ImageEditorContainer from 'bundle-loader?lazy!components/image-editor/mobile.jsx';
        const ImageEditorRouter  = ReactRouterBundleLoader(ImageEditorContainer);
// 模态窗口
        import ModalContainer from 'bundle-loader?lazy!components/modal/mobile.jsx';
        const ModalRouter  = ReactRouterBundleLoader(ModalContainer);
// 基础模态窗口
        import ModalBaseContainer from 'bundle-loader?lazy!components/modal-base/mobile.jsx';
        const ModalBaseRouter  = ReactRouterBundleLoader(ModalBaseContainer);
// 数字键盘
        import NumberKeyboardContainer from 'bundle-loader?lazy!components/number-keyboard/mobile.jsx';
        const NumberKeyboardRouter  = ReactRouterBundleLoader(NumberKeyboardContainer);
// 侧滑抽屉
        import SideDrawerContainer from 'bundle-loader?lazy!components/side-drawer/mobile.jsx';
        const SideDrawerRouter  = ReactRouterBundleLoader(SideDrawerContainer);
// 开关
        import SwitchBarContainer from 'bundle-loader?lazy!components/switch-bar/mobile.jsx';
        const SwitchBarRouter  = ReactRouterBundleLoader(SwitchBarContainer);
// 短信倒计时
        import TimeoutContainer from 'bundle-loader?lazy!components/timeout/mobile.jsx';
        const TimeoutRouter  = ReactRouterBundleLoader(TimeoutContainer);
// 轻提示
        import ToastContainer from 'bundle-loader?lazy!components/toast/mobile.jsx';
        const ToastRouter  = ReactRouterBundleLoader(ToastContainer);


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
// 导航页面
class Home extends React.PureComponent {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.didMount && this.props.didMount();
    }

    render() {
        return (
            <div className="mobile-Home">
                <div className="mobile-Home-item">
            <Button onClick={()=>{
                location.href = "#/Button";
            }}>按钮<span>button</span></Button>
        </div>
<div className="mobile-Home-item">
            <Button onClick={()=>{
                location.href = "#/Icon";
            }}>图标<span>icon</span></Button>
        </div>
<div className="mobile-Home-item">
            <Button onClick={()=>{
                location.href = "#/ImageEditor";
            }}>图片编辑<span>image-editor</span></Button>
        </div>
<div className="mobile-Home-item">
            <Button onClick={()=>{
                location.href = "#/Modal";
            }}>模态窗口<span>modal</span></Button>
        </div>
<div className="mobile-Home-item">
            <Button onClick={()=>{
                location.href = "#/ModalBase";
            }}>基础模态窗口<span>modal-base</span></Button>
        </div>
<div className="mobile-Home-item">
            <Button onClick={()=>{
                location.href = "#/NumberKeyboard";
            }}>数字键盘<span>number-keyboard</span></Button>
        </div>
<div className="mobile-Home-item">
            <Button onClick={()=>{
                location.href = "#/SideDrawer";
            }}>侧滑抽屉<span>side-drawer</span></Button>
        </div>
<div className="mobile-Home-item">
            <Button onClick={()=>{
                location.href = "#/SwitchBar";
            }}>开关<span>switch-bar</span></Button>
        </div>
<div className="mobile-Home-item">
            <Button onClick={()=>{
                location.href = "#/Timeout";
            }}>短信倒计时<span>timeout</span></Button>
        </div>
<div className="mobile-Home-item">
            <Button onClick={()=>{
                location.href = "#/Toast";
            }}>轻提示<span>toast</span></Button>
        </div>

            </div>
        )
    }
}

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routerHash: "",
            routerTitle: ""
        }
    }

    render() {
        const _this = this;
        return (
            <div>
                <div className="mobile-header">
                    <div className="mobile-header-name-en">Mobile Components Library for React</div>
                    <div className="mobile-header-name-cn">React移动端组件库</div>
                </div>
                <section className="mobile-section">
                    {
                        this.state.routerTitle && <div className="mobile-section-title">{this.state.routerTitle}</div>
                    }
                    <div className="mobile-section_detail">
                        <HashRouter>
                            <Switch>
                                <Route path="/Home" render={({ location }) => {
                                    return <Home didMount={() => {
                                        if (location.pathname == "/Home" && _this.state.routerHash !== "Home") {
                                            _this.setState({
                                                routerHash: "Home",
                                                routerTitle: ""
                                            })
                                        }
                                    }} />
                                }} />
                                <Route path="/Button" render={({location})=>{
            return <ButtonRouter didMount={()=>{
                if(location.pathname=="/Button" && _this.state.routerHash!=="Button"){
                    _this.setState({
                        routerHash: "Button",
                        routerTitle: "按钮"
                    })
                }
            }}/>
        }} />
<Route path="/Icon" render={({location})=>{
            return <IconRouter didMount={()=>{
                if(location.pathname=="/Icon" && _this.state.routerHash!=="Icon"){
                    _this.setState({
                        routerHash: "Icon",
                        routerTitle: "图标"
                    })
                }
            }}/>
        }} />
<Route path="/ImageEditor" render={({location})=>{
            return <ImageEditorRouter didMount={()=>{
                if(location.pathname=="/ImageEditor" && _this.state.routerHash!=="ImageEditor"){
                    _this.setState({
                        routerHash: "ImageEditor",
                        routerTitle: "图片编辑"
                    })
                }
            }}/>
        }} />
<Route path="/Modal" render={({location})=>{
            return <ModalRouter didMount={()=>{
                if(location.pathname=="/Modal" && _this.state.routerHash!=="Modal"){
                    _this.setState({
                        routerHash: "Modal",
                        routerTitle: "模态窗口"
                    })
                }
            }}/>
        }} />
<Route path="/ModalBase" render={({location})=>{
            return <ModalBaseRouter didMount={()=>{
                if(location.pathname=="/ModalBase" && _this.state.routerHash!=="ModalBase"){
                    _this.setState({
                        routerHash: "ModalBase",
                        routerTitle: "基础模态窗口"
                    })
                }
            }}/>
        }} />
<Route path="/NumberKeyboard" render={({location})=>{
            return <NumberKeyboardRouter didMount={()=>{
                if(location.pathname=="/NumberKeyboard" && _this.state.routerHash!=="NumberKeyboard"){
                    _this.setState({
                        routerHash: "NumberKeyboard",
                        routerTitle: "数字键盘"
                    })
                }
            }}/>
        }} />
<Route path="/SideDrawer" render={({location})=>{
            return <SideDrawerRouter didMount={()=>{
                if(location.pathname=="/SideDrawer" && _this.state.routerHash!=="SideDrawer"){
                    _this.setState({
                        routerHash: "SideDrawer",
                        routerTitle: "侧滑抽屉"
                    })
                }
            }}/>
        }} />
<Route path="/SwitchBar" render={({location})=>{
            return <SwitchBarRouter didMount={()=>{
                if(location.pathname=="/SwitchBar" && _this.state.routerHash!=="SwitchBar"){
                    _this.setState({
                        routerHash: "SwitchBar",
                        routerTitle: "开关"
                    })
                }
            }}/>
        }} />
<Route path="/Timeout" render={({location})=>{
            return <TimeoutRouter didMount={()=>{
                if(location.pathname=="/Timeout" && _this.state.routerHash!=="Timeout"){
                    _this.setState({
                        routerHash: "Timeout",
                        routerTitle: "短信倒计时"
                    })
                }
            }}/>
        }} />
<Route path="/Toast" render={({location})=>{
            return <ToastRouter didMount={()=>{
                if(location.pathname=="/Toast" && _this.state.routerHash!=="Toast"){
                    _this.setState({
                        routerHash: "Toast",
                        routerTitle: "轻提示"
                    })
                }
            }}/>
        }} />

                                <Route path="*" component={SelectRout} />
                            </Switch>
                        </HashRouter>
                    </div>
                </section>
            </div>
        )
    }
}

export default App;