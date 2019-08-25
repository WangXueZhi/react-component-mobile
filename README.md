# React移动端组件库

# 开发命令

### 构建

```javascript
gulp
```

### 监听构建

```javascript
gulp watch
```

### 调试模式

```javascript
gulp demo
```

该命令会在文件改动保存时自动构建

# 开发规范

### 命名

模块命名：如果以类的方式导出，则首字母大写，驼峰规则。

样式命名：以 "wdpc" 开头， "-" 作为连接，"-" 前后为父子元素关系，例如：wdpc-switch, wdpc-switch-bar。

### 目录

每个模块都拥有独立的目录，代码存放该目录中独立维护

### 模块配置

每个模块需要拥有独立的package.json配置文件指明模块路径

### 说明文档

每个模块需要拥有独立的README.md文档，说明模块的作用和API。

### 导出

需要在所在的父级目录中的index.ts导出对应模块

# 如何使用组件

## 下载安装

```bash
tnpm install @wd-mobile/wd-mobile-component --save
```

## 使用组件
```javascript react jsx
import React from "react";
import { Button } from "wd-mobile-component";
export default class App extends React.Component {
     constructor(props) {
        super(props);
        this.state = {};
     }
     render() {
         return(
             <div>
                 <Button type="primary">主按钮</Button>
                 <Button ghost>幽灵按钮</Button>
                 <Button disabled>不可点</Button>
              </div>
         )
    }
 }
 ```

## 按需加载

如果直接使用了 `import { Button } from 'wd-mobile-component';` 的写法引入了 wd-mobile-component 下所有的模块，这会影响应用的网络性能。

可以通过以下的写法来按需加载组件。

```jsx
import Button from 'wd-mobile-component/lib/Button';
```

如果你使用了 babel，那么可以使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 来进行按需加载，加入这个插件后。你可以仍然这么写：

```jsx
import { Button } from 'wd-mobile-component';
```

插件会帮你转换成 `wd-mobile-component/lib/xxx` 的写法。