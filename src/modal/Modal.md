---
version: 0.0.1
author:
import:
    - typo/reset
---

# 模态窗口
组件默认会根据移动设备系统调用对应UI的弹窗

## 基本用法

```jsx demo
import * as React from "react";
import * as ReactDOM from "react-dom";
import Modal from "wdpcCommon/Modal";

class App extends React.Component<any, any>{
    constructor(props) {
        super(props);

        this.state = {
            show: false
        };
    }

    render(){
        return(
            <div>
                <button onClick={()=>{
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
                }}>{"Modal.show() 方式"}</button>
                <button onClick={()=>{
                    this.setState({
                        show: true
                    })
                }}>{"<Modal /> 方式"}</button>
                <Modal show={this.state.show} maskClick={()=>{
                    this.setState({
                        show: false
                    })
                }} type="android">描述文字的字数尽量控制在三行 内，并且单行最右侧尽量不要是 标点符号。</Modal>
            </div>
        )
    }
}

ReactDom.render(
    <App />
    ,
    __root__
);
```








