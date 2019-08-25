---
version: 0.0.1
author: weidongdong <weidongdong@wdai.com>
import:
    - typo/reset
    
tag:
    - 待校验
---
# 轻提示
轻提示

## 基本用法

```jsx demo
import * as React from "react";
import * as ReactDOM from "react-dom";
import Toast from "wdpcCommon/Toast";

class App extends React.Component<any, any> {
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

ReactDom.render(
    <App />,
    __root__
);
```
