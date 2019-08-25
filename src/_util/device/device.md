---
version: 1.0.0
author: wangxuezhi <417787371@qq.com>
---
# 设备判断

```jsx demo doc
import { VNode, render } from "ui/control";
import device from "util/device";

render(
    __root__,
    <div>
        <button onClick={()=>{
            alert(device.ios());
        }}>是否ios</button>
    </div>
);
```