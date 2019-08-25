---
version: 0.0.1
author:
import:
    - typo/reset
tag:
    - 待验证
---

# Android模态窗口
组件对Modal进行封装，提供Android模态窗口的样式

## 基本用法

```jsx demo
import * as React from "react";
import * as ReactDOM from "react-dom";
import ModalForAndroid from "wdpcCommon/ModalForAndroid";

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
                <ModalForAndroid 
                    show={this.state.show}
                    title="标题"
                    maskClick={()=>{
                        this.setState({
                            show: false
                        })
                    }}
                >描述文字的字数尽量控制在三行 内，并且单行最右侧尽量不要是 标点符号。</ModalForAndroid>
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








