---
version: 0.0.1
author: dongbizhen <dongbizhen@wdai.com>
tag:
    - 待验证
---
# 短信倒计时
点击发送短信验证码,可设定倒计时时间

```jsx demo
import * as React from "react";
import TimeOut from 'wdpcCommon/TimeOut';
import * as ReactDOM from "react-dom";
ReactDom.render(
    <TimeOut title="点我试试" nextTitle="再点我试试" time={10} begin={()=>{ alert('ready'); return true;}} end={()=>{alert('end')}}/>
    ,
    __root__
);
```