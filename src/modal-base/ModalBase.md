---
version: 0.0.1
author:
import:
    - typo/reset
---

# 基础模态窗口
组件只提供模态窗口基本样式，可对该组件进行封装

## 基本用法

```jsx demo
import * as React from "react";
import * as ReactDOM from "react-dom";
import ModalBase from "wdpcCommon/ModalBase";

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
                    this.setState({
                        show: true
                    })
                }}>点击显示</button>
                <ModalBase show={this.state.show} maskClick={()=>{
                    this.setState({
                        show: false
                    })
                }}>模态窗口容器，可完全自定义封装</ModalBase>
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








