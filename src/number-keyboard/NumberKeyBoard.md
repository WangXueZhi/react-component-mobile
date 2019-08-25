---
version: 0.0.1
author: weidongdong <weidongdong@wdai.com>
import:
    - typo/reset
tag:
    - 待校验
---
# 数字键盘
数字键盘

## 基本用法

```jsx demo
import * as React from "react";
import * as ReactDOM from "react-dom";
import NumberKeyBoard from "wdpcCommon/NumberKeyBoard";

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
                <input 
                    value={this.state.value} 
                    onFocus={() => { this.setState({ show: true }); }}
                />
                <NumberKeyBoard 
                    show={this.state.show}
                    onChange={(num) => {
                        this.setState({
                            value: num
                        });
                    }}
                ></NumberKeyBoard>
            </div>
        );
    }
}

ReactDom.render(
    <App />,
    __root__
);
```
