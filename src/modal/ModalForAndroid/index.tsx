import "./index.less";
import * as React from "react";
import classnames from "../../_util/classnames/classnames";
import { ModalBaseProps, ModalBase} from "../../modal-base";

export class ModalForAndroidProps extends ModalBaseProps {
    /**
    * 弹窗标题
    */
    title = null;
    /**
    * 弹窗内容
    */
    children = null;
    /**
    * 按钮
    */
    buttons = [{
        text: "确定",
        click: function () {
            alert("android");
        }
    }];
}

/**
 * @internal
 */
export class ModalForAndroid extends React.Component<any, any> {
    static defaultProps = new ModalForAndroidProps();

    /**
     * 设置按钮
     */
    setButtons() {
        let btnArr = [];
        let btnAmount = this.props.buttons.length;
        for (let i = 0; i < btnAmount; i++) {
            btnArr.push(
                <button key={i} className={i + 1 == btnAmount ? "wdmb-ModalForAndroid-button-main" : ""} onClick={() => {
                    this.props.buttons[i].click();
                }}>{this.props.buttons[i].text}</button>
            )
        }
        return btnArr;
    }

    render() {

        const baseProps = {
            show: this.props.show,
            ani: this.props.ani,
            popup: this.props.popup,
            maskClick: this.props.maskClick,
            showMask: this.props.showMask
        }

        return (
            <ModalBase {...baseProps}>
                <div className={classnames("wdmb-ModalForAndroid", {
                    [this.props.className]: this.props.className,
                })}>
                    <div className="wdmb-ModalForAndroid-container">
                        {
                            this.props.title && <div className={"wdmb-ModalForAndroid-title"}>{this.props.title}</div>
                        }
                        <div className={"wdmb-ModalForAndroid-content"}>
                            {this.props.children}
                        </div>
                    </div>
                    <div className={"wdmb-ModalForAndroid-button"}>
                        {this.setButtons()}
                    </div>
                </div>
            </ModalBase>
        );
    }
}

export default ModalForAndroid;

