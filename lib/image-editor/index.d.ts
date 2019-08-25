/**
 * 图片编辑
 * @prop { Boolean } pinch 是否允许缩放 @default false
 * @prop { Boolean } rotate 是否允许旋转 @default false
 * @prop { String } className 样式名 @default ""
 * @prop { Function } cancle 取消回调
 * @prop { Function } reset 取消回调
 * @prop { Function } complete 取消回调
 * @example
 * import React from "react";
 * import ImageEditor from "wdpcCommon/image-editor";
 * export default class App extends React.Component {
 *    constructor(props) {
 *        super(props);
 *    }
 *
 *    render(){
 *        return(
 *            <ImageEditor></ImageEditor>
 *        )
 *    }
 * }
 */
import './index.less';
/**
 * 图片编辑配置参数。
 */
export declare class ImageEditorProps {
    /**
     * 样式名
     */
    className: string;
    /**
     * 是否开启缩放
     */
    pinch: boolean;
    /**
     * 是否开启旋转
     */
    rotate: boolean;
    /**
     * 取消按钮回调函数
     */
    cancle: () => void;
    /**
     * 重置按钮回调函数
     */
    reset: () => void;
    /**
     *  完成按钮回调函数
     */
    complete: () => void;
}
