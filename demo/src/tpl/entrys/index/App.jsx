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
                            __header_nav__
                        </ul>
                    </div>
                </header>
                <section className="section">
                    <div className="section_sideNav">
                        <ul>
                            __navsText__
                        </ul>
                    </div>
                    <div className="section_detail">
                        <HashRouter>
                            <Switch>
                                <Route exact path="/" component={SelectRout} />
                                __routersText__
                            </Switch>
                        </HashRouter>
                    </div>
                </section>
            </div>
        )
    }
}

export default App;