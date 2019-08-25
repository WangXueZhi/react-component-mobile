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

__importsText__

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
                __mobileHomeItems__
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
                    <div className="mobile-header-name-en">Weidai Mobile Components Library for React</div>
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
                                __routersText__
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