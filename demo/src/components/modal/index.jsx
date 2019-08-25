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
            data: {"title":"模态窗口","prop":["{ Boolean } show 是否显示 @default false\n","{ Boolean } showMask 是否显示遮罩层 @default true\n","{ String } ani 动画进入方向 @default \"center\"\n","{ Boolean } popup 是否popup模式 @default false\n","{ Function } maskClick 点击遮罩层回调\n","{ String } className 样式\n","{ String } title 标题\n","{ JSX.Element } children 内容\n","{ Array } buttons 按钮\n"],"desc":"组件默认会根据移动设备系统调用对应UI的弹窗\n","name":"Modal"},
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
import Modal from "wdpcCommon/modal";
import Button from "wdpcCommon/button";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            iosshow: false
        };
    }

    render(){
        return(
            <div>
                <div>
                    <Button onClick={()=>{
                        Modal.show({
                            maskClick: function(){
                                Modal.hide();
                            },
                            buttons: [{
                                text: "确定",
                                click: function(){
                                    alert("确定");
                                }
                            }, {
                                text: "关闭",
                                click: function(){
                                    Modal.hide();
                                }
                            }],
                            title: "123",
                            content: <a>123</a>
                        })
                    }}>{"Modal.show()"}</Button>
                </div>
                <div style={{marginTop: "10px"}}>
                    <Button onClick={()=>{
                        this.setState({
                            show: true
                        })
                    }}>{"<Modal></Modal>"}</Button>
                </div>
                <Modal show={this.state.show} maskClick={()=>{
                    this.setState({
                        show: false
                    })
                }}>描述文字的字数尽量控制在三行 内，并且单行最右侧尽量不要是 标点符号。</Modal>
                <div style={{marginTop: "10px"}}>
                    <Button onClick={()=>{
                        this.setState({
                            iosshow: true
                        })
                    }}>ios系统</Button>
                </div>
                <Modal type="ios" buttons = {[{
                    text: "确定",
                    click: ()=>{
                        this.setState({
                            iosshow: false
                        })
                    }
                }]}
                show={this.state.iosshow}
                maskClick={()=>{
                    this.setState({
                        iosshow: false
                    })
                }}>描述文字的字数尽量控制在三行 内，并且单行最右侧尽量不要是 标点符号。</Modal>
            </div>
        )
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