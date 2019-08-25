import React from "react";
import Example from "./example";
import classnames from "classnames";
import util from "commons/util";
import { isArray } from "util";
import phone_head_statebar from "images/phone_head_statebar.png";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {"title":"轻提示","static":["{ Function } info 显示 @param { String } message 消息 @param { Number } duration 持续时间 @param { Function } closeCallback 回调方法\n","{ Function } success 成功提示 @param { String } message 消息 @param { Number } duration 持续时间 @param { Function } closeCallback 回调方法\n","{ Function } fail 失败提示 @param { String } message 消息 @param { Number } duration 持续时间 @param { Function } closeCallback 回调方法\n","{ Function } loading 等待提示 @param { String } message 消息 @param { Number } duration 持续时间 @param { Function } closeCallback 回调方法\n","{ Function } hide 关闭提示\n"],"name":"Toast.1"},
            openCode: false
        }
    }

    componentDidMount() {
        this.props.didMount && this.props.didMount();
        hljs.highlightBlock(document.querySelector("pre code"));
    }

    render() {
        return (
            <div>
                <div className="components_name">
                    {this.state.data.name} <span>{this.state.data.title || ""}</span>
                </div>
                <div className="components_desc">
                    {this.state.data.desc}
                </div>
                <div className="components_example part_block">
                    <div className="components_example_imitator">
                        <div className="components_example_imitator_head">
                            <div className="phone_head_statebar">
                                <img src={phone_head_statebar} alt="" />
                            </div>
                            <div style={{ height: "40px" }}>
                                <div className="phone_head_urlbar">{`${location.origin}/mobile.html#/${this.state.data.name}`}</div>
                            </div>
                        </div>
                        <iframe className="components_example_partExp" src={`${location.origin}/mobile.html#/${this.state.data.name}`}>
                            {/* <Example /> */}
                        </iframe>
                    </div>
                    <div className="components_example_title part_block_title">
                        代码演示
                    </div>
                    <div className="components_example_part">
                        <div className="components_example_part_code">
                            <div className="components_example_part_codeTitle">
                                Code
                                <span onClick={() => {
                                    this.setState({
                                        openCode: !this.state.openCode
                                    })
                                }}>{this.state.openCode ? "</>" : "< >"}</span>
                            </div>
                            <div className={classnames("components_example_part_codeCode", { "hide": !this.state.openCode })}>
                                <pre className=""><code className="lang-javascript components_example_part_codeCode_javascript">{`import * as React from "react";
import * as ReactDOM from "react-dom";
import Toast from "wdpcCommon/toast";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            show: false
        };
    }
    render() {
        return (
            <div className="container">
                <button onClick={() => {
                    Toast.info('最长长长长长长文案不超过十六个字', 1000, () => { alert('提示完成'); });
                }}>文案提示</button>
                <button onClick={() => {
                    Toast.success('成功提示', 1000);
                }}>成功提示</button>
                <button onClick={() => {
                    Toast.fail('失败提示', 1000);
                }}>失败提示</button>
                <button onClick={() => {
                    Toast.loading('加载中...', 1000);
                }}>加载提示1</button>
                <button onClick={() => {
                    Toast.loading();
                }}>加载提示2</button>
            </div>
        );
    }
}`}</code></pre>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="components_api part_block">
                    <div className="components_api_title part_block_title">API</div>
                    <div className="components_api_body">
                        <div className="components_api_prop_title wdpc-blank">props</div>
                        {
                            this.state.data.prop ? <table className="components_api_prop">
                                <tbody className="components_api_prop_table">
                                    <tr>
                                        <th>属性</th>
                                        <th>说明</th>
                                        <th>类型</th>
                                        <th>默认值</th>
                                    </tr>
                                    {
                                        this.apiTable(this.state.data.prop)
                                    }
                                </tbody>
                            </table> : <div>无</div>
                        }
                    </div>
                    <div className="components_api_body">
                        <div className="components_api_static_title wdpc-blank">static</div>
                        {
                            this.state.data.static ? <table className="components_api_prop">
                                <tbody className="components_api_prop_table">
                                    <tr>
                                        <th>方法名</th>
                                        <th>说明</th>
                                        <th>参数</th>
                                    </tr>
                                    {
                                        this.staticTable(this.state.data.static)
                                    }
                                </tbody>
                            </table> : <div>无</div>
                        }
                    </div>
                </div>
            </div>
        )
    }

    apiTable(apisData) {
        //获取类型
        let getRootType = (str) => {
            let reg = /^\{.*\}/;
            let rootStr = str.match(reg)[0];
            rootStr = rootStr.replace("{", "");
            rootStr = rootStr.replace("}", "");
            rootStr = util.clean(rootStr);
            return rootStr;
        }

        let getRootAttr = (str) => {
            let reg = /^\{.*\}/;
            let rootStr = util.clean(str.replace(reg, "").trim(), ' ');
            return rootStr.split(' ');
        }

        let newApisData = [];
        if (!apisData.map) {
            newApisData.push(apisData);
        } else {
            newApisData = apisData;
        }
        return newApisData.map((item) => {
            let rootType = getRootType(item);
            let attrs = getRootAttr(item);
            console.log(attrs)
            return (
                <tr key={item} className="components_api_prop_table_row">
                    <td>
                        {attrs[0] || ''}
                    </td>
                    <td>
                        {attrs[1] || ''}
                    </td>
                    <td>
                        {rootType}
                    </td>
                    <td>
                        {attrs[3] || '-'}
                    </td>
                </tr>
            )
        })
    }

    staticTable(statics) {
        //获取类型
        let getRootType = (str) => {
            let reg = /^\{.*\}/;
            let rootStr = str.trim().match(reg)[0];
            rootStr = rootStr.replace("{", "");
            rootStr = rootStr.replace("}", "");
            rootStr = util.clean(rootStr);
            return rootStr;
        }
        let getRootAttr = (str) => {
            let reg = /^\{.*\}/;
            let rootStr = util.clean(str.replace(reg, "").trim(), ' ');
            return rootStr.split(' ');
        }
        let staticsArr = [];
        if (isArray(statics)) {
            staticsArr = staticsArr.concat(statics);
        } else {
            staticsArr.push(statics)
        }

        return staticsArr.map((item, index) => {
            let funItem = item.split('@param') || [];
            let attrs = getRootAttr(funItem[0] || '');
            return <tr key={index} className="components_api_prop_table_row">
                <td>
                    {attrs[0] || ''}
                </td>
                <td>
                    {attrs[1] || ''}
                </td>
                <td>
                    {funItem.length && funItem.splice(1, funItem.length - 1).map(((item, index) => {

                        let attr = getRootAttr(item.trim() || '');
                        let type = getRootType(item);
                        return <div key={index}>{attr[0]} : {attr[1]} ({type})</div>
                    }))}
                </td>
            </tr>
        })

    }
}