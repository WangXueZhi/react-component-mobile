---
version: 0.0.1
author:
import:
    - typo/reset
tag:
    - 待验证
---

# Ios模态窗口
组件对Modal进行封装，提供Ios模态窗口的样式

## 基本用法

```jsx demo
import * as React from "react";
import * as ReactDOM from "react-dom";
import ModalForIos from "wdpcCommon/ModalForIos";

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
                <ModalForIos 
                    show={this.state.show}
                    title="标题"
                    maskClick={()=>{
                        this.setState({
                            show: false
                        })
                    }}
                    buttons={[
                        {
                            text: "取消",
                            click: ()=>{
                                this.setState({
                                    show: false
                                }) 
                            }
                        },
                        {
                            text: "确定",
                            click: ()=>{
                                this.setState({
                                    show: false
                                }) 
                            }
                        }
                    ]}
                >点击确认关闭窗口</ModalForIos>
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








