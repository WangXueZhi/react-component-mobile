import * as React from "react";
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
}