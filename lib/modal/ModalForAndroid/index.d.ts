import "./index.less";
import { ModalBaseProps } from "../../modal-base";
export declare class ModalForAndroidProps extends ModalBaseProps {
    /**
    * 弹窗标题
    */
    title: any;
    /**
    * 弹窗内容
    */
    children: any;
    /**
    * 按钮
    */
    buttons: {
        text: string;
        click: () => void;
    }[];
}
export default ModalForAndroid;
