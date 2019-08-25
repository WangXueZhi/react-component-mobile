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
            data: {"title":"图标","prop":["{ String } name icon名字，对应显示你要的icon图形 @default \"xianshi\"\r","{ String } color 自定义icon字体颜色\r","{ String } size 自定义icon字体大小\r","{ Function } clickEvent 点击自身事件\r","{ String } className 样式\r"],"name":"Icon"},
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
                                <pre className=""><code className="lang-javascript components_example_part_codeCode_javascript">{`import React from "react";import Icon from "wdpcCommon/icon";const style = {   float: "left",   width: "33.33%",   textAlign: "center",   padding: "10px 0"};const nameStyle = {   marginTop: "5px",   fontSize: "10px",   textAlign: "center"};export default class App extends React.Component {     constructor(props) {         super(props);         this.state = {};     }     render() {         return(             <div>               <div style={style}>                   <Icon name="xianshi" />                   <div style={nameStyle}>xianshi</div>               </div>               <div style={style}>                   <Icon name="yincang" />                   <div style={nameStyle}>yincang</div>               </div>               <div style={style}>                   <Icon name="chenggong" />                   <div style={nameStyle}>chenggong</div>               </div>               <div style={style}>                   <Icon name="shibai" />                   <div style={nameStyle}>shibai</div>               </div>               <div style={style}>                   <Icon name="jiazai" />                   <div style={nameStyle}>jiazai</div>               </div>               <div style={style}>                   <Icon name="youbianjiantou" />                   <div style={nameStyle}>youbianjiantou</div>               </div>               <div style={style}>                   <Icon name="zuobianjiantou" />                   <div style={nameStyle}>zuobianjiantou</div>               </div>               <div style={style}>                   <Icon name="guanbihoveranniu" />                   <div style={nameStyle}>guanbihoveranniu</div>               </div>               <div style={style}>                   <Icon name="queding" />                   <div style={nameStyle}>queding</div>               </div>             </div>         )     }}`}</code></pre>
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