import * as React from "react";
import * as ReactDOM from "react-dom";
import Button from "wdpcCommon/button";
import Toast from "wdpcCommon/toast";

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container">
                <div>
                    <Button>默认按钮</Button>
                </div>
                <div style={{marginTop: "10px"}}>
                    <Button disabled>默认按钮</Button>
                </div>
                <div style={{marginTop: "10px"}}>
                    <Button ghost>默认幽灵按钮</Button>
                </div>
                <div style={{marginTop: "10px"}}>
                    <Button type="primary">主要按钮</Button>
                </div>
                <div style={{marginTop: "10px"}}>
                    <Button disabled type="primary">主要按钮</Button>
                </div>
                <div style={{marginTop: "10px"}}>
                    <Button ghost type="primary">主要幽灵按钮</Button>
                </div>
                <div style={{marginTop: "10px"}}>
                    <Button type="warning">警告按钮</Button>
                </div>
                <div style={{marginTop: "10px"}}>
                    <Button disabled type="warning">警告按钮</Button>
                </div>
                <div style={{marginTop: "10px"}}>
                    <Button ghost type="warning">警告幽灵按钮</Button>
                </div>
                <div style={{marginTop: "10px"}}>
                    <Button inline type="primary" style={{marginRight: "5px"}}>内联按钮</Button>
                    <Button inline ghost type="primary">内联幽灵按钮</Button>
                </div>
                <div style={{marginTop: "10px"}}>
                    <Button inline size="small" type="primary" style={{marginRight: "5px"}}>小号按钮</Button>
                    <Button inline size="small" ghost type="primary">小号幽灵按钮</Button>
                </div>
            </div>
        );
    }
}